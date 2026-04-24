const { cloudinary } = require('../config/cloudinary');
const Album = require('../models/Album');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit for covers
});

exports.albumUploadMiddleware = upload.fields([{ name: 'cover', maxCount: 1 }]);

const uploadBufferToCloudinary = (buffer, folder) => new Promise((resolve, reject) => {
  const stream = cloudinary.uploader.upload_stream(
    { folder, resource_type: 'image' },
    (error, result) => {
      if (error) return reject(error);
      return resolve(result);
    }
  );
  stream.end(buffer);
});

exports.createAlbum = async (req, res, next) => {
  try {
    let albumData = { ...req.body, owner: req.user._id };

    if (req.files && req.files.cover) {
      const result = await uploadBufferToCloudinary(req.files.cover[0].buffer, 'vocalz/album_covers');
      albumData.coverUrl = result.secure_url;
      albumData.coverPublicId = result.public_id;
    }

    const album = await Album.create(albumData);
    res.status(201).json({ success: true, data: album });
  } catch (error) {
    next(error);
  }
};

exports.getMyAlbums = async (req, res, next) => {
  try {
    const albums = await Album.find({ owner: req.user._id });
    res.status(200).json({ success: true, data: albums });
  } catch (error) {
    next(error);
  }
};

exports.getAlbum = async (req, res, next) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).json({ success: false, message: 'Album not found' });
    res.status(200).json({ success: true, data: album });
  } catch (error) {
    next(error);
  }
};

exports.updateAlbum = async (req, res, next) => {
  try {
    let updateData = { ...req.body };

    if (req.files && req.files.cover) {
      const result = await uploadBufferToCloudinary(req.files.cover[0].buffer, 'vocalz/album_covers');
      updateData.coverUrl = result.secure_url;
      updateData.coverPublicId = result.public_id;
    }

    const album = await Album.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      updateData,
      { new: true }
    );
    
    if (!album) return res.status(404).json({ success: false, message: 'Album not found' });
    res.status(200).json({ success: true, data: album });
  } catch (error) {
    next(error);
  }
};

exports.deleteAlbum = async (req, res, next) => {
  try {
    const query = req.user.role === 'admin' ? { _id: req.params.id } : { _id: req.params.id, owner: req.user._id };
    const album = await Album.findOne(query);
    if (!album) return res.status(404).json({ success: false, message: 'Album not found or unauthorized' });

    if (album.coverPublicId) {
      // Check if any other album or song uses this cover image
      const Song = require('../models/Song');
      const [otherAlbum, songWithCover] = await Promise.all([
        Album.findOne({ coverPublicId: album.coverPublicId, _id: { $ne: album._id } }),
        Song.findOne({ coverPublicId: album.coverPublicId })
      ]);

      if (!otherAlbum && !songWithCover) {
        await cloudinary.uploader.destroy(album.coverPublicId, { resource_type: 'image' });
      }
    }

    await album.deleteOne();
    res.status(200).json({ success: true, message: 'Album deleted' });
  } catch (error) {
    next(error);
  }
};
