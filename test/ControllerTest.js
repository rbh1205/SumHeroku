require('should');
const request = require('supertest');
const controller = require("../controller/controller");
let tid = Date.now(); 

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

    // it('deleteProduct() test', async () => {
    //     let product2 = await controller.createProduct('testDeleteProduct', 150, 'testDeleteProduct')
    //     deleteProduct('d1');
    //     product2.productID.should.be.notEqual('d1');
    //     product2.name.should.be.notEqual('testDeleteProduct');
    //     product2.price.should.be.notEqual(150);
    //     product2.category.should.be.notEqual('testDeleteProduct');
    // })


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
        orders.length.should.be.greaterThanOrEqual(1); 
        orders[0].time.should.be.equal(tid);
        orders[0].table.should.be.equal('1');
        orders[0].waiter.should.be.equal('Kim');
        orders[0].products.length.should.be.greaterThanOrEqual(1); 
        orders[0].price.should.be.equal(100); 
        orders[0].comment.should.be.equal('testComment')
    });
    
   

    it('deleteOrder() test', async () => {
        let order2 = await controller.createOrder('11:11', '2', 'Lars', ['test', 'test2'], 150, 'testComment')
        deleteOrder('2')
        order2.should.be.notEqual('11:11', '2', 'Lars', ['test', 'test2'], 150, 'testComment')
    })

});