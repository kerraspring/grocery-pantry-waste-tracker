const mongoose = require('mongoose')

const PantryItemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: false,
  },
  cost: {
    type: Number,
    required: false,
  }
})

module.exports = mongoose.model('PantryItem', PantryItemSchema)
