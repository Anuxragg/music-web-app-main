const mongoose = require('mongoose');

const PlaySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  song: { type: mongoose.Schema.Types.ObjectId, ref: 'Song', required: true },
  playedAt: { type: Date, default: Date.now },
  secondsListened: { type: Number, default: 0 },
}, { timestamps: true });

PlaySchema.index({ user: 1, playedAt: -1 });
PlaySchema.index({ song: 1, playedAt: -1 });

module.exports = mongoose.model('Play', PlaySchema);
