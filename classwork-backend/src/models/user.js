const MONGOOSE = require('mongoose');

const USER_SCHEMA = new MONGOOSE.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    bio: {
        type: String,
        default: ''
    },
    profile_image: {
        type: String,
    },
    is_verified: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = MONGOOSE.model('User_DATA', USER_SCHEMA);