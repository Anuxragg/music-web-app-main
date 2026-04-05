const multer = require('multer');
const Song = require('../models/Song');
const { cloudinary } = require('../config/cloudinary');

const memoryUpload = multer({ storage: multer.memoryStorage() });
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
      audioUpload = await uploadBufferToCloudinary(req.files.audio[0].buffer, 'vocalz/audio', 'video');
    }

    if (req.files?.cover?.[0]) {
      coverUpload = await uploadBufferToCloudinary(req.files.cover[0].buffer, 'vocalz/covers', 'image');
    }

    const song = await Song.create({
      title,
      artist,
      artistRef: artistRef || undefined,
      album: album || undefined,
      albumText: albumText || '',
      audioUrl: audioUpload?.secure_url || '',
      audioPublicId: audioUpload?.public_id || '',
      coverUrl: coverUpload?.secure_url || '',
      coverPublicId: coverUpload?.public_id || '',
      duration: Number(duration || 0),
      genre,
      uploadedBy: req.user._id,
      isPublic: String(isPublic) !== 'false',
    });

    return res.status(201).json({ success: true, data: song });
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
      await cloudinary.uploader.destroy(song.coverPublicId, { resource_type: 'image' });
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
