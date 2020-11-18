require('should');
const request = require('supertest');
const controller = require("../controller/controller");
let tid = 1234; 

//test af Controller test funktioner
describe('controller test - promise', function () {
    

    it('createProduct() test', async () => {
        let product = await controller.createProduct('testCreateProduct', 100, 'testProductCategory');
        product.name.should.be.equal('testCreateProduct');
        product.price.should.be.equal(100);
        product.category.should.be.equal('testProductCategory');
    });

    it('getProducts() test', async () => {
        let products = await controller.getProducts(); 
        products.length.should.be.greaterThanOrEqual(1); 
        products[0].name.should.be.equal('testCreateProduct');
        products[0].price.should.be.equal(100);
        products[0].category.should.be.equal('testProductCategory');
    });

    it('deleteProduct() test', async () => {
        let product2 = await controller.createProduct('testDeleteProduct', 150, 'testDeleteProduct')
        let id = product2.id
        controller.deleteProduct('testDeleteProduct'); 
        product2 = await controller.getProduct(id); 
        should.equal(product2, null)
    })


    it('createOrder() test', async () => {
        let order = await controller.createOrder(tid, '1', 'Kim', 'test1', 100, 'testComment')
        order.time.should.be.equal(tid);
        order.table.should.be.equal('1');
        order.waiter.should.be.equal('Kim'); 
        order.products.should.be.equal('test1')
        order.price.should.be.equal(100);
        order.comment.should.be.equal('testComment')
    });

    it('getOrders() test', async () => {
        let orders = await controller.getOrders(); 
        orders[orders.length-1].time.should.be.equal(tid);
        orders[orders.length-1].table.should.be.equal('1');
        orders[orders.length-1].waiter.should.be.equal('Kim');
        orders[orders.length-1].products.length.should.be.greaterThanOrEqual(1); 
        orders[orders.length-1].price.should.be.equal(100); 
        orders[orders.length-1].comment.should.be.equal('testComment')
    });
    
   

    it('deleteOrder() test', async () => {
        let order2 = await controller.createOrder(tid, '2', 'Lars', 'test1', 150, 'testComment')
        let id = order2._id
        controller.deleteProduct(id)
        order2 = await controller.getProduct(id)
        should.equal(order2, null)
    })

});