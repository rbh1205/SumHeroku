const mongoose = require('mongoose');
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