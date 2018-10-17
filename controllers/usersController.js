const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const photoDrop = require('../models/photoDrop');

// rrrr


// render the main users page
router.get('/', (req, res) => {
  Users.find({}, (err, usersFound) => {
    res.render('./users/index.ejs', {
      users: usersFound
    });
  });
});

router.get('/:id/photos', (req, res) => {
  Users.findById(req.params.id, (err, userFound) => {
    photoDrop.find({}, (err, photosFound) => {
      res.render('./users/showP.ejs', {
        user: userFound,
        photos: photosFound
      });
    });
  });
});


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

// create a show route for each user (index page for each user)
router.get('/:id', (req, res) => {
  console.log(req.params.id, ' This is your id!');
  Users.findById(req.params.id, (err, userFound) => {
    res.render('./users/show.ejs', {
      user: userFound
    });
  });
});

// create a delete button for each user

router.delete('/:id', (req, res) => {
  console.log(req.params.id, ' This is the id you want to delete!');
  Users.findByIdAndRemove(req.params.id, (err, userFound) => {
    res.redirect('/users');
  });
});

// create an edit page for users
router.get('/:id/edit', (req, res) => {
  Users.findById(req.params.id, (err, userFound) => {
    res.render('./users/edit.ejs', {
      user: userFound
    })
  })
});

// create a put request to change the user info

router.put('/:id', (req, res) => {
  Users.findByIdAndUpdate(req.params.id, req.body, (err, userFound) => {
    res.redirect('/users');
  });
});

module.exports = router;
