const Playlist = require('../models/Playlist');

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
    const playlist = await Playlist.create({ ...req.body, owner: req.user._id });
    res.status(201).json({ success: true, data: playlist });
  } catch (error) {
    next(error);
  }
};

exports.updatePlaylist = async (req, res, next) => {
  try {
    const playlist = await Playlist.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
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
    const deleted = await Playlist.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!deleted) return res.status(404).json({ success: false, message: 'Playlist not found' });
    res.status(200).json({ success: true, message: 'Playlist deleted' });
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
