const Artist = require('../models/Artist');
const Song = require('../models/Song');
const Album = require('../models/Album');
const User = require('../models/User');

exports.getArtists = async (req, res, next) => {
  try {
    const artists = await Artist.find().populate('user', 'username avatar');
    res.status(200).json({ success: true, data: artists });
  } catch (error) {
    next(error);
  }
};

exports.getArtist = async (req, res, next) => {
  try {
    const artist = await Artist.findById(req.params.id).populate('user', 'username avatar');
    if (!artist) return res.status(404).json({ success: false, message: 'Artist not found' });
    res.status(200).json({ success: true, data: artist });
  } catch (error) {
    next(error);
  }
};

exports.getArtistSongs = async (req, res, next) => {
  try {
    const songs = await Song.find({ artistRef: req.params.id, isPublic: true });
    res.status(200).json({ success: true, data: songs });
  } catch (error) {
    next(error);
  }
};

exports.getArtistAlbums = async (req, res, next) => {
  try {
    const albums = await Album.find({ artistRef: req.params.id, isPublic: true });
    res.status(200).json({ success: true, data: albums });
  } catch (error) {
    next(error);
  }
};

exports.updateArtist = async (req, res, next) => {
  try {
    const artist = await Artist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!artist) return res.status(404).json({ success: false, message: 'Artist not found' });
    res.status(200).json({ success: true, data: artist });
  } catch (error) {
    next(error);
  }
};

exports.followArtist = async (req, res, next) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).json({ success: false, message: 'Artist not found' });

    const user = await User.findById(req.user._id);
    if (!user.following.some((id) => id.toString() === artist.user.toString())) {
      user.following.push(artist.user);
      await user.save();
    }

    res.status(200).json({ success: true, message: 'Artist followed' });
  } catch (error) {
    next(error);
  }
};

exports.unfollowArtist = async (req, res, next) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).json({ success: false, message: 'Artist not found' });

    await User.findByIdAndUpdate(req.user._id, {
      $pull: { following: artist.user },
    });

    res.status(200).json({ success: true, message: 'Artist unfollowed' });
  } catch (error) {
    next(error);
  }
};
