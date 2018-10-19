const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');

require('./db/db');

const authController = require('./controllers/auth')
const usersController = require('./controllers/usersController');
const photoDropController = require('./controllers/photoDropController');

app.use(session({
  secret: 'this is some random secret string',
  resave: false,
  saveUninitialized: false
}));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.use('/users', usersController);
app.use('/photos', photoDropController);
app.use('/auth', authController);

app.get('/', (req, res) => {
  res.render('index.ejs');
})








app.listen(3000, () => {
  console.log('YOUR APP IS LIVE!')
})
