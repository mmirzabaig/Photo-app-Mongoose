const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');



router.get('/login', (req, res) => {
  // ON EVERY SINGLE ROUTE IN THE WHOLE ENITRE APPLICATION
  // you have attached to req a new property called session
  // console.log(req.session);

  res.render('./auth/login.ejs', {
    message: req.session.message
  })

});

router.post('/register', async (req, res) => {

  const password = req.body.password;

  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  console.log(passwordHash);

  const userEntry = {};
  userEntry.username = req.body.username;
  userEntry.password = passwordHash;

  const user = await User.create(userEntry)
  console.log(user);
  req.session.username = req.body.username;
  req.session.logged = true;
  req.session.message = '';

  res.redirect('/users');
  passwordCheck(passwordHash);

  // try{
  //   console.log(req.body);
  //     await User.create(req.body);
  //
  // } catch(err) {
  //
  // }
})
router.post('/login', async (req, res) => {
  //first query the database to see if the user exists
  try {
    const foundUser = await User.findOne({
      username: req.body.username
    });
    console.log(foundUser)

    if (foundUser) {
      // if the users exists use the bcrypt compare password
      //to make sure the passwords match
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.logged = true;

        res.redirect('/users')
      } else {
        req.session.message = 'Username or Password is Wrong';
        res.redirect('/auth/login')
      }
    } else {
      req.session.message = 'Username or Password is Wrong';
      res.redirect('/auth/login')
    } // end of foundUser
  } catch (err) {
    res.send('error')
  }
});

router.get('/logout', (req, res) => {
  // this basically restarts the session
  // and clears out all the properties that we set
  // on the session object
  req.session.destroy((err) => {
    if (err) {
      res.send(err);
    } else {
      res.redirect('/auth/login')
    }
  });
});



module.exports = router;