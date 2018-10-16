const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.render('./users/index.ejs');
})

router.get('/new', (req, res) => {
  res.render('./users/new.ejs');
})



module.exports = router;
