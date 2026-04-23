const mongoose = require('mongoose');
const Album = require('./models/Album');

async function fix() {
  try {
    await mongoose.connect('mongodb+srv://anuragpal9002_db_user:H5EAHltoNLgUjBun@musiccluster.gpvwl3i.mongodb.net/?appName=MusicCluster');

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
