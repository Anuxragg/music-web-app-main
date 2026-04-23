const mongoose = require('mongoose');
require('dotenv').config({ path: '../server/.env' });

const Song = require('../server/models/Song');
const Artist = require('../server/models/Artist');

async function fix() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://admin:admin@cluster0.b7fiv.mongodb.net/vocalz?retryWrites=true&w=majority&appName=Cluster0');
    console.log('Connected to DB');

    // Update any song with artist 'Daniel Caesar' to 'Daniel Ceasar'
    const result = await Song.updateMany(
      { artist: 'Daniel Caesar' },
      { $set: { artist: 'Daniel Ceasar' } }
    );
    console.log(`Updated ${result.modifiedCount} songs.`);

    // Delete the incorrect artist profile
    const delResult = await Artist.deleteOne({ displayName: 'Daniel Caesar' });
    console.log(`Deleted ${delResult.deletedCount} incorrect artist profiles.`);

    console.log('Done');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

fix();
