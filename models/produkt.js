const mongoose = require('mongoose');

const Product = new mongoose.Schema({
    name: String,
    price: Number,
    Category: String,
});

module.exports = mongoose.model('Product', Product);