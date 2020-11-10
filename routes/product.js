const controller = require("../controller/controller");
const express = require('express');
const router = express.Router();

router
    .get('/', async (request, response) => {
        try {
            let products = await controller.getProducts();
            response.send(products);
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
    )
    .delete('/:productID', async (request, response) => {
        try {
            await controller.deleteProduct(request.params.productID);
            response.send({message: 'Product deleted!'});
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

