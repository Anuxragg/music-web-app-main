const multer = require('multer');
const mongoose = require('mongoose');
const Song = require('../models/Song');
const Album = require('../models/Album');
const { cloudinary } = require('../config/cloudinary');

const memoryUpload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit for audio files
  }
});

exports.songUploadMiddleware = memoryUpload.fields([
  { name: 'audio', maxCount: 1 },
  { name: 'cover', maxCount: 1 },
]);

const uploadBufferToCloudinary = (buffer, folder, resourceType) => new Promise((resolve, reject) => {
  const stream = cloudinary.uploader.upload_stream(
    { folder, resource_type: resourceType },
    (error, result) => {
      if (error) return reject(error);
      return resolve(result);
    }
  );
  stream.end(buffer);
});

exports.getSongs = async (req, res, next) => {
  try {
    const { q, genre, artist, page = 1, limit = 10, sort = '-createdAt' } = req.query;
    const filter = { isPublic: true };

    if (q) filter.$text = { $search: q };
    if (genre) filter.genre = new RegExp(`^${genre}$`, 'i');
    if (artist) filter.artist = new RegExp(artist, 'i');

    const songs = await Song.find(filter)
      .populate('album', 'title coverUrl')
      .populate('artistRef', 'displayName')
      .sort(sort)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Song.countDocuments(filter);
    return res.status(200).json({
      success: true,
      data: songs,
      pagination: { total, page: Number(page), limit: Number(limit) },
    });
  } catch (error) {
    return next(error);
  }
};

exports.getSong = async (req, res, next) => {
  try {
    const song = await Song.findById(req.params.id).populate('album artistRef uploadedBy', 'title displayName username');
    if (!song) return res.status(404).json({ success: false, message: 'Song not found' });
    return res.status(200).json({ success: true, data: song });
  } catch (error) {
    return next(error);
  }
};

exports.createSong = async (req, res, next) => {
  try {
    const { title, artist, artistRef, album, albumText, duration, genre, isPublic = true } = req.body;
    let audioUpload;
    let coverUpload;

    if (req.files?.audio?.[0]) {
      console.log('--- Cloudinary: Uploading Audio ---');
      audioUpload = await uploadBufferToCloudinary(req.files.audio[0].buffer, 'vocalz/audio', 'video');
      console.log('✅ Audio Upload Success:', audioUpload.secure_url);
    } else {
      return res.status(400).json({ success: false, message: 'Audio file is required' });
    }

    let finalCoverUrl = req.body.coverUrl || '';
    let finalCoverPublicId = req.body.coverPublicId || '';
    let targetAlbumId = (album && mongoose.Types.ObjectId.isValid(album)) ? album : undefined;

    // 1. Process uploaded cover if present (takes priority)
    if (req.files?.cover?.[0]) {
      console.log('--- Cloudinary: Uploading Cover ---');
      const coverUpload = await uploadBufferToCloudinary(req.files.cover[0].buffer, 'vocalz/covers', 'image');
      finalCoverUrl = coverUpload.secure_url;
      finalCoverPublicId = coverUpload.public_id;
      console.log('✅ Cover Upload Success:', finalCoverUrl);
    } 
    // 2. Inherit cover from album if no song cover or URL provided
    else if (!finalCoverUrl && (album || albumText)) {
      let parentAlbum;
      if (targetAlbumId) {
        parentAlbum = await Album.findById(targetAlbumId);
      } else if (albumText) {
        parentAlbum = await Album.findOne({ title: new RegExp(`^${albumText}$`, 'i') });
      }

      if (parentAlbum && parentAlbum.coverUrl) {
        finalCoverUrl = parentAlbum.coverUrl;
        finalCoverPublicId = parentAlbum.coverPublicId;
        if (!targetAlbumId) targetAlbumId = parentAlbum._id;
        console.log('📦 Inheriting cover from album:', parentAlbum.title);
      }
    }

    const song = await Song.create({
      title: title || 'Untitled Track',
      artist: artist || req.user.username,
      artistRef: artistRef || undefined,
      album: targetAlbumId,
      albumText: albumText || '',
      audioUrl: audioUpload?.secure_url || '',
      audioPublicId: audioUpload?.public_id || '',
      coverUrl: finalCoverUrl,
      coverPublicId: finalCoverPublicId,
      duration: Number(audioUpload?.duration || duration || 0),
      genre: genre || 'Pop',
      uploadedBy: req.user._id,
      isPublic: String(isPublic) !== 'false',
    });

    return res.status(201).json({ success: true, data: song });
  } catch (error) {
    console.error('❌ BACKEND UPLOAD ERROR:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Cloudinary or Database Error: ' + error.message,
      error: error
    });
  }
};

exports.updateSong = async (req, res, next) => {
  try {
    const { title, artist, genre, albumText, isPublic } = req.body;
    const song = await Song.findById(req.params.id);

    if (!song) return res.status(404).json({ success: false, message: 'Song not found' });

    // Permissions check
    if (song.uploadedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to edit this track' });
    }

    if (title) song.title = title;
    if (artist) song.artist = artist;
    if (genre) song.genre = genre;
    if (albumText !== undefined) song.albumText = albumText;
    if (isPublic !== undefined) song.isPublic = (isPublic === true || isPublic === 'true');

    // Handle Cover Update
    if (req.files?.cover?.[0]) {
      const coverUpload = await uploadBufferToCloudinary(req.files.cover[0].buffer, 'vocalz/covers', 'image');
      song.coverUrl = coverUpload.secure_url;
      song.coverPublicId = coverUpload.public_id;
    } else if (req.body.album && mongoose.Types.ObjectId.isValid(req.body.album)) {
      // If album changed and no new cover provided, update cover from new album
      const newAlbum = await Album.findById(req.body.album);
      if (newAlbum && newAlbum.coverUrl) {
        song.coverUrl = newAlbum.coverUrl;
        song.coverPublicId = newAlbum.coverPublicId;
        song.album = newAlbum._id;
      }
    }

    await song.save();
    return res.status(200).json({ success: true, data: song });
  } catch (error) {
    return next(error);
  }
};

exports.deleteSong = async (req, res, next) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ success: false, message: 'Song not found' });

    if (song.audioPublicId) {
      await cloudinary.uploader.destroy(song.audioPublicId, { resource_type: 'video' });
    }
    if (song.coverPublicId) {
      // Check if any other song or album uses this cover image before deleting from Cloudinary
      const [otherSong, albumWithCover] = await Promise.all([
        Song.findOne({ coverPublicId: song.coverPublicId, _id: { $ne: song._id } }),
        Album.findOne({ coverPublicId: song.coverPublicId })
      ]);

      if (!otherSong && !albumWithCover) {
        await cloudinary.uploader.destroy(song.coverPublicId, { resource_type: 'image' });
        console.log('🗑️ Cloudinary cover deleted.');
      } else {
        console.log('ℹ️ Skipping Cloudinary cover deletion - image is shared.');
      }
    }

    await song.deleteOne();
    return res.status(200).json({ success: true, message: 'Song deleted' });
  } catch (error) {
    return next(error);
  }
};

exports.getTrending = async (req, res, next) => {
  try {
    const songs = await Song.find({ isPublic: true }).sort({ playCount: -1 }).limit(10);
    return res.status(200).json({ success: true, data: songs });
  } catch (error) {
    return next(error);
  }
};
exports.renameAlbum = async (req, res, next) => {
  try {
    const { oldName, newName } = req.body;
    if (!oldName || !newName) {
      return res.status(400).json({ success: false, message: 'Old and new names are required' });
    }

    await Song.updateMany(
      { albumText: oldName },
      { $set: { albumText: newName } }
    );

    return res.status(200).json({ success: true, message: 'Album renamed successfully' });
  } catch (error) {
    return next(error);
  }
};
