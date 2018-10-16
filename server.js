const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

require('./db/db');

const usersController = require('./controllers/usersController');
const photoDropController = require('./controllers/photoDropController');

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.use('/users', usersController);
app.use('/photos', photoDropController);

app.get('/', (req, res) => {
  res.render('index.ejs');
})








app.listen(3000, () => {
  console.log('YOUR APP IS LIVE!')
})
