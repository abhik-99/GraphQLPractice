const mongoose = require('mongoose');

const Author = new mongoose.Schema({
    name: String,
    sex: String,
    age: Number
})

module.exports = new mongoose.model('Author',Author)