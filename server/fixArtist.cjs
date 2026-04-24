require('dotenv').config();
const mongoose = require('mongoose');
const Album = require('./models/Album');

async function fix() {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }
    await mongoose.connect(mongoUri);

    const result = await Album.updateMany(
      { artist: 'Daniel Caesar' },
      { $set: { artist: 'Daniel Ceasar' } }
    );
    console.log(`Updated ${result.modifiedCount} albums.`);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

fix();
