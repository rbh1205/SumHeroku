const controller = require("../controllers/controller");
const express = require('express');
const { Router } = require("express");
const router = express.Router();

router
    .get('/', async (request, response) => {
        try {
            let Products = await controller.getProducts();
            response.send(Products);
        } catch (e) {
            sendStatus(e, response);
        }
    })
    .post('/', async (request, response) => {
            try {
                let {name, price, category} = request.body;
                await controller.createProduct(name, price, category);
                response.send({message: 'Product saved!'});
            } catch (e) {
                sendStatus(e, response);
            }
        }
    );

function sendStatus(e, response) {
    console.error("Exception: " + e);
    if (e.stack) console.error(e.stack);
    response.status(500).send(e);
}

module.exports = router;

