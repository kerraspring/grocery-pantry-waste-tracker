const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({

    googleId: {
        type: String,
        required: true,
    },

    displayName: {
        type: String,
        required: true,
    },
    items: [{
        id: {
            type: String,
          },
          title: {
            type: String,
          },
          listType: {
            type: String,
          },
          quantity: {
            type: Number,
          },
          cost: {
            type: Number,
          }
    }]

},
{collection: 'users'}
);

module.exports = mongoose.model('User', UserSchema)
