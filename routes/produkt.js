const controller = require("../controllers/controller");
const express = require('express');
const { Router } = require("express");
const router = express.Router();

router
    .get('/', async (request, response) => {
        try {
            let produkts = await controller.getProdukts();
            response.send(produkts);
        } catch (e) {
            sendStatus(e, response);
        }
    })
    .post('/', async (request, response) => {
            try {
                let {name, price, catagory} = request.body;
                await controller.createProdukt(name, price, catagory);
                response.send({message: 'Produkt saved!'});
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

