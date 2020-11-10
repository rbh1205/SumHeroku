const mongoose = require('mongoose');

const produkt = new mongoose.Schema({
    name: String,
    price: Number,
    Category: String,
});

module.exports = mongoose.model('Produkt', produkt);