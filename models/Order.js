// Order.js
const mongoose = require('mongoose');

const order = new mongoose.Schema({
    time: String,
    table: String,
    waiter: String,
    products: [{ type: mongoose.ObjectId, ref: 'Product' }],
    price: Number,
    comment: String
});

module.exports = mongoose.model('Order', order);