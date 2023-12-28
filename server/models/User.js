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
    items: {
        id: {
            type: Number,
            required: false,
          },
          title: {
            type: String,
            required: false,
          },
          listType: {
            type: String,
            required: false,
          },
          quantity: {
            type: Number,
            required: false,
          },
          cost: {
            type: Number,
            required: false,
          }
    }

},
{collection: 'users'}
);

module.exports = mongoose.model('User', UserSchema)
