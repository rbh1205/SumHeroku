const mongoose = require('mongoose');
const Order = require('../models/Order');
const Product = require('../models/Product')
const config = require('../config');

mongoose.connect(config.databaseURI, {useNewUrlParser: true, useUnifiedTopology: true})

exports.createProduct = function (name, price, Catagory) {
    return Product.create({
        name,
        price,
        Catagory
    });
};

exports.getProduct = function (produktId) {
    return Product.findById(produktId).exec();
};

exports.getProducts = function () {
    return Product.find().populate('product').exec();
};

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

