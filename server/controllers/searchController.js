const Song = require('../models/Song');
const Artist = require('../models/Artist');
const Album = require('../models/Album');
const Playlist = require('../models/Playlist');

exports.searchAll = async (req, res, next) => {
  try {
    const q = (req.query.q || '').trim();
    if (!q) {
      return res.status(400).json({ success: false, message: 'Query is required' });
    }

    const regex = new RegExp(q, 'i');

    const [songs, artists, albums, playlists] = await Promise.all([
      Song.find({ $or: [{ title: regex }, { artist: regex }, { genre: regex }, { albumText: regex }], isPublic: true }).limit(12),
      Artist.find({ $or: [{ displayName: regex }, { bio: regex }, { genres: regex }] }).limit(12),
      Album.find({ $or: [{ title: regex }, { genre: regex }], isPublic: true }).limit(12),
      Playlist.find({ $or: [{ name: regex }, { description: regex }], isPublic: true }).limit(12),
    ]);

    return res.status(200).json({
      success: true,
      data: { songs, artists, albums, playlists },
    });
  } catch (error) {
    return next(error);
  }
};
