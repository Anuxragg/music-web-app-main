const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  album: {
    type: String
  },
  genre: {
    type: String
  },
  duration: {
    type: Number
  },
  audioUrl: {
    type: String,
    required: true
  },
  coverImage: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Song', SongSchema);
