const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createNewWallpaper, fetchNewWallPapers, deleteNewWallPaper, updateNewWallPaper, fetchNewWallPaperById } = require('../sqlController/NewWallpaper.controller');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });

router
  .post('/', upload.single('image'), createNewWallpaper)
  .get('/', fetchNewWallPapers)
  .delete('/:id', deleteNewWallPaper)
  .put('/:id', upload.single('image'), updateNewWallPaper)
  .get('/:id', fetchNewWallPaperById);

exports.router = router;
