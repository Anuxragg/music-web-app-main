require('dotenv').config();

const mongoose = require('mongoose');
const User = require('../models/User');
const Artist = require('../models/Artist');
const Album = require('../models/Album');
const Song = require('../models/Song');
const Playlist = require('../models/Playlist');
const songs = require('./songs.json');

const ARTIST_NAMES = ['Arijit Singh', 'The Weeknd', 'AP Dhillon', 'Eminem', 'Dua Lipa'];

const PLAYLISTS = [
  'Bollywood Hits',
  'Western Pop',
  'Punjabi Fire',
  'Late Night Feels',
  'Workout Mode',
];

const ALBUMS = [
  { title: 'After Hours', genre: 'Pop', type: 'album', artist: 'The Weeknd' },
  { title: 'Future Nostalgia', genre: 'Pop', type: 'album', artist: 'Dua Lipa' },
  { title: 'Bollywood Essentials', genre: 'Bollywood', type: 'album', artist: 'Arijit Singh' },
];

const placeholderCover = 'https://placehold.co/500x500?text=VOCALZ+Album';
const audioURLs = [
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  await Promise.all([
    Playlist.deleteMany({}),
    Song.deleteMany({}),
    Album.deleteMany({}),
    Artist.deleteMany({}),
    User.deleteMany({ email: /@vocalz.demo$/i }),
  ]);

  const createdUsers = [];
  for (const name of ARTIST_NAMES) {
    const slug = name.toLowerCase().replace(/\s+/g, '.');
    const user = await User.create({
      username: slug,
      email: `${slug}@vocalz.demo`,
      password: 'Password@123',
      role: 'artist',
      bio: `${name} official VOCALZ profile`,
    });
    createdUsers.push(user);
  }

  const artistMap = new Map();
  for (let i = 0; i < ARTIST_NAMES.length; i += 1) {
    const displayName = ARTIST_NAMES[i];
    const artist = await Artist.create({
      user: createdUsers[i]._id,
      displayName,
      bio: `${displayName} artist bio`,
      avatar: 'https://placehold.co/500x500?text=VOCALZ+Artist',
      coverImage: 'https://placehold.co/1600x500?text=VOCALZ+Cover',
      genres: ['Pop'],
      verified: i < 3,
      monthlyListeners: 150000 + i * 35000,
    });
    artistMap.set(displayName, artist);
  }

  const albumMap = new Map();
  for (const albumData of ALBUMS) {
    const album = await Album.create({
      title: albumData.title,
      artistRef: artistMap.get(albumData.artist)._id,
      coverUrl: placeholderCover,
      coverPublicId: '',
      releaseDate: new Date('2020-01-01'),
      genre: albumData.genre,
      type: albumData.type,
      songs: [],
      isPublic: true,
    });
    albumMap.set(albumData.title, album);
  }

  const songDocs = [];
  for (let idx = 0; idx < songs.length; idx += 1) {
    const item = songs[idx];
    const album = albumMap.get(item.album);
    const artistRef = artistMap.get(item.artist);

    const song = await Song.create({
      title: item.title,
      artist: item.artist,
      artistRef: artistRef ? artistRef._id : undefined,
      album: album ? album._id : undefined,
      albumText: item.album,
      audioUrl: audioURLs[idx % audioURLs.length],
      audioPublicId: '',
      coverUrl: placeholderCover,
      coverPublicId: '',
      duration: item.duration,
      genre: item.genre,
      playCount: Math.floor(Math.random() * 10000),
      uploadedBy: artistRef ? artistRef.user : createdUsers[0]._id,
      isPublic: true,
    });

    if (album) {
      album.songs.push(song._id);
      await album.save();
    }

    songDocs.push(song);
  }

  const listener = await User.create({
    username: 'demo.listener',
    email: 'listener@vocalz.demo',
    password: 'Password@123',
    role: 'listener',
  });

  for (const name of PLAYLISTS) {
    const selectedSongs = songDocs.sort(() => 0.5 - Math.random()).slice(0, 6);
    await Playlist.create({
      name,
      description: `${name} curated on VOCALZ`,
      owner: listener._id,
      songs: selectedSongs.map((song, idx) => ({ song: song._id, order: idx + 1 })),
      coverUrl: placeholderCover,
      isPublic: true,
    });
  }

  console.log('VOCALZ demo data seeded successfully.');
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error('Seeding failed:', error.message);
  process.exit(1);
});
