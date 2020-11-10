const mongoose = require('mongoose');
const produkt = require('../models/Produkt')
const config = require('../config');

mongoose.connect(config.databaseURI, {useNewUrlParser: true, useUnifiedTopology: true})

exports.createProdukt = function (name, price, Catagory) {
    return produkt.create({
        name,
        price,
        Catagory
    });
};

exports.getProdukt = function (produktId) {
    return produkt.findById(produktId).exec();
};

exports.getProdukts = function () {
    return produkt.find().populate('produkt').exec();
};