const multer = require('multer');
const { cloudinary } = require('../config/cloudinary');
const Playlist = require('../models/Playlist');

const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit for images
});

exports.playlistUploadMiddleware = upload.fields([{ name: 'cover', maxCount: 1 }]);

const uploadBufferToCloudinary = (buffer, folder) => new Promise((resolve, reject) => {
  const stream = cloudinary.uploader.upload_stream(
    { folder, resource_type: 'image' },
    (error, result) => {
      if (error) return reject(error);
      return resolve(result);
    }
  );
  stream.end(buffer);
});

exports.getMyPlaylists = async (req, res, next) => {
  try {
    const playlists = await Playlist.find({ owner: req.user._id }).populate('songs.song', 'title artist coverUrl');
    res.status(200).json({ success: true, data: playlists });
  } catch (error) {
    next(error);
  }
};

exports.getPlaylist = async (req, res, next) => {
  try {
    const playlist = await Playlist.findById(req.params.id).populate('songs.song', 'title artist coverUrl audioUrl');
    if (!playlist) return res.status(404).json({ success: false, message: 'Playlist not found' });
    if (!playlist.isPublic && playlist.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not allowed' });
    }
    res.status(200).json({ success: true, data: playlist });
  } catch (error) {
    next(error);
  }
};

exports.createPlaylist = async (req, res, next) => {
  try {
    let playlistData = { ...req.body, owner: req.user._id };

    // Handle cover image upload if present
    if (req.files && req.files.cover) {
      const result = await uploadBufferToCloudinary(req.files.cover[0].buffer, 'vocalz/playlist_covers');
      playlistData.coverUrl = result.secure_url;
    }

    const playlist = await Playlist.create(playlistData);
    res.status(201).json({ success: true, data: playlist });
  } catch (error) {
    next(error);
  }
};

exports.updatePlaylist = async (req, res, next) => {
  try {
    let updateData = { ...req.body };

    // Handle cover image upload if present
    if (req.files && req.files.cover) {
      const result = await uploadBufferToCloudinary(req.files.cover[0].buffer, 'vocalz/playlist_covers');
      updateData.coverUrl = result.secure_url;
    }

    const playlist = await Playlist.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      updateData,
      { new: true }
    );
    if (!playlist) return res.status(404).json({ success: false, message: 'Playlist not found' });
    res.status(200).json({ success: true, data: playlist });
  } catch (error) {
    next(error);
  }
};

exports.deletePlaylist = async (req, res, next) => {
  try {
    const playlistId = req.params.id;
    const userId = req.user._id.toString();
    
    // Find the playlist first to confirm ownership
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ success: false, message: 'Playlist not found' });
    }
    
    // Check if the current user is the owner
    if (playlist.owner.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Unauthorized to delete this playlist' });
    }
    
    await Playlist.findByIdAndDelete(playlistId);
    
    res.status(200).json({ success: true, message: 'Playlist deleted successfully' });
  } catch (error) {
    next(error);
  }
};

exports.addSongToPlaylist = async (req, res, next) => {
  try {
    const { songId } = req.body;
    const playlist = await Playlist.findOne({ _id: req.params.id, owner: req.user._id });
    if (!playlist) return res.status(404).json({ success: false, message: 'Playlist not found' });

    const existing = playlist.songs.find((entry) => entry.song.toString() === songId);
    if (!existing) {
      playlist.songs.push({ song: songId, order: playlist.songs.length + 1 });
      await playlist.save();
    }

    res.status(200).json({ success: true, data: playlist });
  } catch (error) {
    next(error);
  }
};

exports.removeSongFromPlaylist = async (req, res, next) => {
  try {
    const { songId } = req.params;
    const playlist = await Playlist.findOne({ _id: req.params.id, owner: req.user._id });
    if (!playlist) return res.status(404).json({ success: false, message: 'Playlist not found' });

    playlist.songs = playlist.songs.filter((entry) => entry.song.toString() !== songId);
    playlist.songs.forEach((entry, index) => {
      entry.order = index + 1;
    });
    await playlist.save();

    res.status(200).json({ success: true, data: playlist });
  } catch (error) {
    next(error);
  }
};
