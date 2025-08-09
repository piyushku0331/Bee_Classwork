const MONGOOSE = require('mongoose');

const OTP_SCHEMA = new MONGOOSE.Schema({
    otp: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
        expires: 300
    }
})

module.exports = MONGOOSE.model('Otp_DATA', OTP_SCHEMA);