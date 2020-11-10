// Order.js
const mongoose = require('mongoose');

const order = new mongoose.Schema({
    orderID: String,
    time: String,
    table: String,
    waiter: String,
    products: [{ type: mongoose.ObjectId, ref: 'Product' }],
    price: Number
});

module.exports = mongoose.model('Order', order);