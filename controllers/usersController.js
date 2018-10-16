const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Users = require('../models/users');

// render the main users page
router.get('/', (req, res) => {
  Users.find({}, (err, usersFound) => {
    res.render('./users/index.ejs', {
      users: usersFound
    });
  });
})

// render the new users page
router.get('/new', (req, res) => {
  res.render('./users/new.ejs');
})

// create a new user
router.post('/', (req, res) => {
  console.log(req.body, ' This is your body!');
  Users.create(req.body, (err, userCreated) => {
    if (err) {
      console.log(err);
    } else {
      console.log(userCreated);
      res.redirect('/users');
    }
  })
})



module.exports = router;
