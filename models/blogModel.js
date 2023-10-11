const mongoose = require('mongoose');
const fs = require('fs');
const validator = require('validator');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required field!'],
        maxlength: [100, 'Title must not have nore than 100 characters!'],
        minlength: [4, 'Title must have at least 4 characters!'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required field!'],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    createdBy: {
        type: String
    }
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

// Executed before the document is saved in db before save or create method, but not in case of insertMany or findByUpdate etc. document middleware
// any number of pre or post middlewares can be called
blogSchema.pre('save',function(next){
    this.createdBy = 'RUBBYMISHRA';
    next()
})

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;