const mongoose = require('mongoose');
const express = require('express');
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

router.get('/:id', (req, res) => {
  photoDrop.findById(req.params.id, (err, photoFound) => {
    res.render('./photoDrop/show.ejs', {
      photo: photoFound
    });
  });
});

router.delete('/:id', (req, res) => {
  console.log(req.params.id);
  photoDrop.findByIdAndRemove(req.params.id, (err, photoFound) => {
    res.redirect('/photos');
  });
});

router.get('/:id/edit', (req, res) => {
  photoDrop.findById(req.params.id, (err, photoFound) => {
    res.render('./photoDrop/edit.ejs', {
      photo: photoFound
    });
  });
});

router.put('/:id', (req, res) => {
  console.log(req.body, ' update body');
  photoDrop.findByIdAndUpdate(req.params.id, req.body, (err, photoFound) => {
    res.redirect('/photos');
  });
});


module.exports = router;