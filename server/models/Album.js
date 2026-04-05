const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  artistRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
  coverUrl: { type: String, default: '' },
  coverPublicId: { type: String, default: '' },
  releaseDate: { type: Date },
  genre: { type: String, trim: true },
  type: { type: String, enum: ['album', 'EP', 'single'], default: 'album' },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
  isPublic: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Album', AlbumSchema);
