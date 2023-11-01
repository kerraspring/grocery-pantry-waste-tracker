const mongoose = require('mongoose')

const GroceryItemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
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

module.exports = mongoose.model('GroceryItem', GroceryItemSchema)
