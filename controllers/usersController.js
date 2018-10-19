const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const photoDrop = require('../models/photoDrop');

// rrrr


// render the main users page
router.get('/', async (req, res) => {
  console.log(req.session);
  // Users.find({}, (err, usersFound) => {
  //   res.render('./users/index.ejs', {
  //     users: usersFound
  //   });
  // });
  try {
    const usersFound = await Users.find({});
    res.render('./users/index.ejs', {
      users: usersFound
    })
  } catch (err) {
    res.send(err);
  }
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
router.post('/', async (req, res) => {
  // console.log(req.body, ' This is your body!');
  // Users.create(req.body, (err, userCreated) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(userCreated);
  //     res.redirect('/users');
  //   }
  // })
  console.log(req.body, ' THIS IS YOUR BODY!');
  try {
    Users.create(req.body);
    res.redirect('/users');
  } catch (err) {
    res.send(err);
  }
})

// create a show route for each user (index page for each user)
router.get('/:id', async (req, res) => {
  // console.log(req.params.id, ' This is your id!');
  // Users.findById(req.params.id, (err, userFound) => {
  //   res.render('./users/show.ejs', {
  //     user: userFound
  //   });
  // });
  try {

    const userFound = await Users.findById(req.params.id);

    res.render('./users/show.ejs', {
      user: userFound
    });

  } catch (err) {
    res.send(err);
  }
});

// create a delete button for each user

router.delete('/:id', async (req, res) => {
  console.log(req.session);
  // console.log(req.params.id, ' This is the id you want to delete!');
  // Users.findByIdAndRemove(req.params.id, (err, userFound) => {
  //   res.redirect('/users');
  // });
  try {
    await Users.findByIdAndRemove(req.params.id);

    res.redirect('/users');
  } catch (err) {
    res.send(err);
  }
});

// create an edit page for users
router.get('/:id/edit', async (req, res) => {

  if (req.session.logged === true) {
    try {
      const userFound = await Users.findById(req.params.id);
      res.render('./users/edit.ejs', {
        user: userFound
      })
    } catch (err) {
      res.send(err);
    }
  } else {
    res.redirect('/auth/login');
  }

});

// create a put request to change the user info

router.put('/:id', async (req, res) => {
  try {
    const userFound = await Users.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    res.redirect('/users');
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;