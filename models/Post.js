const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let postSchema = new Schema(
    {
        quote : {
            type : String,
        },
        author : {
            type : String,
        },
        tag : {
            type : String,
        },
    }

);

let Post = mongoose.model('quotes', postSchema, 'quotes');

module.exports = Post;