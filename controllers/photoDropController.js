const mongoose = require('mongoose');
const express = require ('express');
const router = express.Router();

const photoDrop = require('../models/photoDrop');


router.get('/', (req, res) => {
  photoDrop.find({}, (err, photosFound) => {
    res.render('./photoDrop/index.ejs', {
      photos: photosFound
    });
  });
});

router.get('/new', (req, res) => {
  res.render('./photoDrop/new.ejs');
})

router.post('/', (req, res) => {
  console.log(req.body)
  photoDrop.create(req.body, (err, photoFound) => {
    res.redirect('/photos');
  });
});




module.exports = router;
