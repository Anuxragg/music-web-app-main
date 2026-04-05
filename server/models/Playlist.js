const mongoose = require('mongoose');

const PlaylistSongSchema = new mongoose.Schema({
  song: { type: mongoose.Schema.Types.ObjectId, ref: 'Song', required: true },
  order: { type: Number, required: true },
  addedAt: { type: Date, default: Date.now },
}, { _id: false });

const PlaylistSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  songs: [PlaylistSongSchema],
  coverUrl: { type: String, default: '' },
  isPublic: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Playlist', PlaylistSchema);
