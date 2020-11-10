const mongoose = require('mongoose');
const Order = require('../models/Order');
const Product = require('../models/Product')
const config = require('../config');

mongoose.connect(config.databaseURI, {useNewUrlParser: true, useUnifiedTopology: true})

exports.createProduct = function (name, price, category) {
    return Product.create({
        name,
        price,
        category
    });
};

exports.getProduct = function (productId) {
    return Product.findById(productId).exec();
};

exports.getProducts = function () {
    return Product.find().populate('product').exec();
};

exports.deleteProduct(product) = async function () {
    return await Product.deleteOne().where('_id').eq(product._id).exec()
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

exports.deleteOrder(order) = async function () {
    return await Order.deleteOne().where('_id').eq(order._id).exec()
};

