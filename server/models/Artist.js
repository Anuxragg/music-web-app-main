const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  displayName: { type: String, required: true, trim: true },
  bio: { type: String, default: '' },
  avatar: { type: String, default: '' },
  coverImage: { type: String, default: '' },
  genres: [{ type: String, trim: true }],
  verified: { type: Boolean, default: false },
  monthlyListeners: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Artist', ArtistSchema);
