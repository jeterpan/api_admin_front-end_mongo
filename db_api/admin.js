// Módulos de terceiros
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = usuario = mongoose.model('item', ItemSchema)