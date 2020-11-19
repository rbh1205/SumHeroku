const mongoose = require('mongoose');
const Order = require('../models/Order');
const Product = require('../models/Product')
const config = require('../config');

mongoose.connect(config.databaseURI, { useNewUrlParser: true, useUnifiedTopology: true })

exports.createProduct = function (name, price, category) {
    return Product.create({
        name,
        price,
        category
    });
};

exports.updateProduct = async function (id, name, price, category) {
    const filter = { _id: id }
    const updatedProduct = { name, price, category }
    await Product.findOneAndUpdate(filter, updatedProduct, { new: true })
}

exports.getProduct = function (productId) {
    return Product.findById(productId).exec();
};

exports.getProducts = function () {
    return Product.find().populate('product').exec();
};

exports.deleteProduct = async function (productId) {
    return await Product.deleteOne().where('_id').eq(productId).exec()
};

exports.createOrder = function (time, table, waiter, products, price, comment) {
    return Order.create({
        time,
        table,
        waiter,
        products,
        price,
        comment
    });
};

exports.getOrder = function (orderID) {
    return Order.findById(orderID).exec();
};

exports.getOrders = function () {
    return Order.find().populate('order').exec();
};

exports.updateOrder = async function (id, products, price, comment) {
    const filter = {_id: id}
    const update = {products: products, price: price, comment: comment}
    await Order.findOneAndUpdate(filter, update)
}

exports.deleteOrder = async function (orderID) {
    return await Order.deleteOne().where('_id').eq(orderID).exec()
};

