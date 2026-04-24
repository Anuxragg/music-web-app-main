require('dotenv').config();
const mongoose = require('mongoose');

const Album = require('./models/Album');
const Artist = require('./models/Artist');
const Song = require('./models/Song');

async function fix() {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }
    await mongoose.connect(mongoUri);

    const albums = await Album.find({ artist: /Daniel/i });
    console.log('Albums:', albums.map(a => a.title + ' by ' + a.artist));

    const songs = await Song.find({ artist: /Daniel/i });
    console.log('Songs:', songs.map(s => s.title + ' by ' + s.artist));

    const artists = await Artist.find({ displayName: /Daniel/i });
    console.log('Artists:', artists.map(a => a.displayName));

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

fix();
