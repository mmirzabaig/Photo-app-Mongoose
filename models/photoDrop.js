const mongoose = require('mongoose');

const photoDropSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  image: {
    type: String,
    require: true
  },
  info: String,


});

module.exports = mongoose.model('photoDrop', photoDropSchema);