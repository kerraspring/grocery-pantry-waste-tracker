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

},
{collection: 'users'}
);

module.exports = mongoose.model('User', UserSchema)
