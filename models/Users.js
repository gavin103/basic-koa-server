const mongoose = require('../db')
const { USERS_COLLECTION } = require('../db/config')
const { Schema, model } = mongoose

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  },
})

module.exports = model(USERS_COLLECTION, UserSchema)