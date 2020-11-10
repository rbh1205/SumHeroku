const controller = require("../controller/controller");
const express = require('express');
const router = express.Router();

router
    .get('/', async (request, response) => {
        try {
            let orders = await controller.getOrders();
            response.send(orders);
        } catch (e) {
            sendStatus(e, response);
        }
    })
    .post('/', async (request, response) => {
            try {
                let {time, table, waiter, products, price} = request.body;
                await controller.createOrder(time, table, waiter, products, price);
                response.send({message: 'Order saved!'});
            } catch (e) {
                sendStatus(e, response);
            }
        }
    )
    .delete('/:orderID', async (request, response) => {
        try {
            await controller.deleteOrder(request.params.orderID)
            response.send({message: 'Order deleted!'});
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

