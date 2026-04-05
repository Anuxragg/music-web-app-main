const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  artist: { type: String, required: true, trim: true },
  artistRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist' },
  album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' },
  albumText: { type: String, default: '' },
  audioUrl: { type: String, default: '' },
  audioPublicId: { type: String, default: '' },
  coverUrl: { type: String, default: '' },
  coverPublicId: { type: String, default: '' },
  duration: { type: Number, default: 0 },
  genre: { type: String, trim: true, default: '' },
  playCount: { type: Number, default: 0 },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isPublic: { type: Boolean, default: true },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

SongSchema.index({ title: 'text', artist: 'text', albumText: 'text', genre: 'text' });

SongSchema.virtual('durationFormatted').get(function durationFormatted() {
  const total = Number(this.duration || 0);
  const mins = Math.floor(total / 60);
  const secs = String(total % 60).padStart(2, '0');
  return `${mins}:${secs}`;
});

module.exports = mongoose.model('Song', SongSchema);
