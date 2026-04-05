const User = require('../models/User');

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id || req.user._id)
      .select('-password -refreshToken')
      .populate('following', 'username avatar');

    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const allowed = ['username', 'avatar', 'bio', 'preferences'];
    const payload = Object.keys(req.body)
      .filter((key) => allowed.includes(key))
      .reduce((acc, key) => ({ ...acc, [key]: req.body[key] }), {});

    const user = await User.findByIdAndUpdate(req.user._id, payload, { new: true }).select('-password -refreshToken');
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

exports.getLikedSongs = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({ success: true, data: user.likedSongs });
  } catch (error) {
    next(error);
  }
};

exports.toggleLikeSong = async (req, res, next) => {
  try {
    const { songId } = req.params;
    const user = await User.findById(req.user._id);

    const alreadyLiked = user.likedSongs.some((id) => id.toString() === songId);
    if (alreadyLiked) {
      user.likedSongs = user.likedSongs.filter((id) => id.toString() !== songId);
    } else {
      user.likedSongs.push(songId);
    }

    await user.save();
    res.status(200).json({ success: true, liked: !alreadyLiked });
  } catch (error) {
    next(error);
  }
};
