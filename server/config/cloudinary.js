const { v2: cloudinary } = require('cloudinary');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const audioStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'vocalz/audio',
    resource_type: 'video',
  },
});

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'vocalz/covers',
    transformation: [{ width: 500, height: 500, crop: 'fill' }],
  },
});

const uploadAudio = multer({ storage: audioStorage });
const uploadImage = multer({ storage: imageStorage });

module.exports = {
  cloudinary,
  uploadAudio,
  uploadImage,
};
