// Order.js
const mongoose = require('mongoose');

const order = new mongoose.Schema({
    order: String,
    paymentMethod: String
});

module.exports = mongoose.model('PaidOrder', order, "PaidOrder");