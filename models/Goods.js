const mongoose = require('../db')
const { GOODS_COLLECTION } = require('../db/config')
const { Schema, model } = mongoose

const GoodSchema = new Schema({
  pn: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  usage: {
    type: String,
  },
  quatity: {
    type: Number,
  },
  category:{
    type: String
  },
  maintainer:{
    type: String,
    required: true
  }
})

module.exports = model(GOODS_COLLECTION, GoodSchema)