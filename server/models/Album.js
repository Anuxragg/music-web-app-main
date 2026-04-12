const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  artist: { type: String, trim: true },
  artistRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  coverUrl: { type: String, default: '' },
  coverPublicId: { type: String, default: '' },
  releaseDate: { type: Date, default: Date.now },
  genre: { type: String, trim: true, default: 'Pop' },
  type: { type: String, enum: ['album', 'EP', 'single'], default: 'album' },
  isPublic: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Album', AlbumSchema);
