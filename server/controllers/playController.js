const Play = require('../models/Play');
const Song = require('../models/Song');

exports.logPlay = async (req, res, next) => {
  try {
    const { songId, secondsListened = 0 } = req.body;

    const [play] = await Promise.all([
      Play.create({ user: req.user._id, song: songId, secondsListened }),
      Song.findByIdAndUpdate(songId, { $inc: { playCount: 1 } }),
    ]);

    res.status(201).json({ success: true, data: play });
  } catch (error) {
    next(error);
  }
};

exports.getHistory = async (req, res, next) => {
  try {
    const plays = await Play.find({ user: req.user._id })
      .sort({ playedAt: -1 })
      .populate('song')
      .limit(100);

    const seen = new Set();
    const deduped = [];
    for (const play of plays) {
      if (!play.song) continue;
      const key = play.song._id.toString();
      if (!seen.has(key)) {
        seen.add(key);
        deduped.push(play);
      }
      if (deduped.length >= 30) break;
    }

    res.status(200).json({ success: true, data: deduped });
  } catch (error) {
    next(error);
  }
};

exports.getStats = async (req, res, next) => {
  try {
    const start = new Date();
    start.setDate(start.getDate() - 7);

    const topSongs = await Play.aggregate([
      { $match: { user: req.user._id, playedAt: { $gte: start } } },
      { $group: { _id: '$song', plays: { $sum: 1 } } },
      { $sort: { plays: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'songs',
          localField: '_id',
          foreignField: '_id',
          as: 'song',
        },
      },
      { $unwind: '$song' },
      { $project: { plays: 1, song: 1 } },
    ]);

    res.status(200).json({ success: true, data: topSongs });
  } catch (error) {
    next(error);
  }
};
