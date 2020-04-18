const mongoose = require('mongoose');

const Book = new mongoose.Schema({
    name: String,
    authorId: String,
    genre: String
})

module.exports = new mongoose.model('Book',Book)