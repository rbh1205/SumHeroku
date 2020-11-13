// Order.js
const mongoose = require('mongoose');

const order = new mongoose.Schema({
    time: String,
    table: String,
    waiter: String,
    products: [{String, String, String}],
    price: Number,
    comment: String
});

module.exports = mongoose.model('Order', order);