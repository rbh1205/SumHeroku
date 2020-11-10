// controller.js
const mongoose = require('mongoose');
const Order = require('../models/Order');
const config = require('../config');

mongoose.connect(config.databaseURI, { useNewUrlParser: true, useUnifiedTopology: true });

exports.createOrder = function (orderID, time, table, waiter, products, price) {
    return Order.create({
        orderID,
        time,
        table,
        waiter,
        products,
        price
    });
};

exports.getOrder = function (orderID) {
    return Order.findById(orderID).exec();
};

exports.getOrders = function () {
    return Order.find().populate('order').exec();
};

