const MONGOOSE = require('mongoose');

const BLOG_SCHEMA = new MONGOOSE.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        reqired: true
    },
    author: {
        type: MONGOOSE.Schema.Types.name,
        ref: 'User_DATA',
        required: true
    },
    tags: {
        type : [String],
        default: []
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = MONGOOSE.model('Blog_DATA', BLOG_SCHEMA);