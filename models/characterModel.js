const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserCharacterSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  }
});

const UserCharacterModel = mongoose.model('userCharacter', UserCharacterSchema);

module.exports = UserCharacterModel;