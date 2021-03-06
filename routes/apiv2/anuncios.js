
'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Anuncio = mongoose.model('Anuncio');

const multer = require('multer');



// Subir imagen
router.post('/upload',  (req, res) => {
  
  const storage = multer.diskStorage({
    destination: function( req, file, cb) {
      cb(null, 'public/images/');
    },
    filename: function(req, file, cb) {
      const myFilename = `ad_${req.query.id}_${file.originalname}`;
      cb(null, myFilename);
    }
  });

  console.log("Pin");
  let upload = multer({ storage: storage }).single('image');

  upload(req, res, async function(err) {
      const sharp = require('sharp');
      const thumbnail = `thumbnail_ad_${req.query.id}_${req.file.originalname}`;
      sharp(req.file.path).resize(50, 50).toFile('public/images/' + `${thumbnail}`, (err, resizeImage) => {
              if (err) {
                    console.log(err);
              } else {
                    console.log(resizeImage);
              }
      }); 

      if (req.fileValidationError) {
          return res.send(req.fileValidationError);
      }
      else if (!req.file) {
          return res.send('Please select an image to upload');
      }
      else if (err instanceof multer.MulterError) {
          return res.send(err);
      }
      else if (err) {
          return res.send(err);
      }

      // Display uploaded image for user validation
      res.send(`You have uploaded this image: <br> <img src="${req.file.path}" width="500">  (We created this thumbnail: ${thumbnail})`);

      const id = req.query.id;
    
      const anuncio = await Anuncio.findById(id);      
      anuncio.thumbnail=thumbnail;
      anuncio.foto=thumbnail.replace("thumbnail_","");
      anuncio.save();      

  });




});



router.get('/', (req, res, next) => {
  console.log(req.apiAuthUserId);
  const start = parseInt(req.query.start) || 0;
  const limit = parseInt(req.query.limit) || 1000; // nuestro api devuelve max 1000 registros
  const sort = req.query.sort || '_id';
  const includeTotal = req.query.includeTotal === 'true';
  const filters = {};
  if (typeof req.query.tag !== 'undefined') {
    filters.tags = req.query.tag;
  }

  if (typeof req.query.venta !== 'undefined') {
    filters.venta = req.query.venta;
  }

  if (typeof req.query.precio !== 'undefined' && req.query.precio !== '-') {
    if (req.query.precio.indexOf('-') !== -1) {
      filters.precio = {};
      let rango = req.query.precio.split('-');
      if (rango[0] !== '') {
        filters.precio.$gte = rango[0];
      }

      if (rango[1] !== '') {
        filters.precio.$lte = rango[1];
      }
    } else {
      filters.precio = req.query.precio;
    }
  }

  if (typeof req.query.nombre !== 'undefined') {
    filters.nombre = new RegExp('^' + req.query.nombre, 'i');
  }

  Anuncio.list(filters, start, limit, sort, includeTotal, function (err, anuncios) {
    if (err) return next(err);
    res.json({ ok: true, result: anuncios });
  });
});

// Return the list of available tags
router.get('/tags', function (req, res) {
  res.json({ ok: true, allowedTags: Anuncio.allowedTags() });
});

module.exports = router;
