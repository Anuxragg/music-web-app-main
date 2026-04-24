const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  displayName: { type: String, required: true, trim: true },
  bio: { type: String, default: '' },
  avatar: { type: String, default: '' },
  coverImage: { type: String, default: '' },
  genres: [{ type: String, trim: true }],
}, { timestamps: true });

module.exports = mongoose.model('Artist', ArtistSchema);
