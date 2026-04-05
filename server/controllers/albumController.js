const Album = require('../models/Album');
const Song = require('../models/Song');

exports.getAlbums = async (req, res, next) => {
  try {
    const albums = await Album.find({ isPublic: true }).populate('artistRef', 'displayName').populate('songs', 'title');
    res.status(200).json({ success: true, data: albums });
  } catch (error) {
    next(error);
  }
};

exports.getAlbum = async (req, res, next) => {
  try {
    const album = await Album.findById(req.params.id).populate('artistRef songs');
    if (!album) return res.status(404).json({ success: false, message: 'Album not found' });
    res.status(200).json({ success: true, data: album });
  } catch (error) {
    next(error);
  }
};

exports.createAlbum = async (req, res, next) => {
  try {
    const album = await Album.create(req.body);
    res.status(201).json({ success: true, data: album });
  } catch (error) {
    next(error);
  }
};

exports.updateAlbum = async (req, res, next) => {
  try {
    const album = await Album.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!album) return res.status(404).json({ success: false, message: 'Album not found' });
    res.status(200).json({ success: true, data: album });
  } catch (error) {
    next(error);
  }
};

exports.deleteAlbum = async (req, res, next) => {
  try {
    const album = await Album.findByIdAndDelete(req.params.id);
    if (!album) return res.status(404).json({ success: false, message: 'Album not found' });
    res.status(200).json({ success: true, message: 'Album deleted' });
  } catch (error) {
    next(error);
  }
};

exports.addSongToAlbum = async (req, res, next) => {
  try {
    const { songId } = req.body;
    const [album, song] = await Promise.all([
      Album.findById(req.params.id),
      Song.findById(songId),
    ]);

    if (!album || !song) {
      return res.status(404).json({ success: false, message: 'Album or song not found' });
    }

    if (!album.songs.some((id) => id.toString() === song._id.toString())) {
      album.songs.push(song._id);
      await album.save();
    }

    song.album = album._id;
    song.albumText = album.title;
    await song.save();

    res.status(200).json({ success: true, data: album });
  } catch (error) {
    next(error);
  }
};
