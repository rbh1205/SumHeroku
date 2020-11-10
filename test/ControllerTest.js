require('should');
const controller = require("../controller/controller");


describe('controller test - promise', function () {
    it('getProducts() test', async () => {
        let products = await controller.getProducts(); 
        products.length.should.be.greaterThanOrEqual(1); 
        products[0].name.should.be.equal('testProduct');
        products[0].price.should.be.equal(50);
        procuts[0].category.should.be.equal('testCategory');
    });

    it('createProduct() test', async () => {
        let product = await controller.createProduct('testCreateProduct', 100, 'testCreateCategory')
        product.name.should.be.equal('testCreateProduct');
        product.price.should.be.equal(100);
        product.category.should.be.equal('testCreateCategory');
    });


    it('getOrders() test', async () => {
        let orders = await controller.getOrders(); 
        orders.length.should.be.greaterThanOrEqual(1); 
        orders[0].orderID.should.be.equal('1');
        orders[0].time.should.be.equal('10:10');
        orders[0].table.should.be.equal('1');
        orders[0].waiter.should.be.equal('Kim');
        orders[0].products.length.should.be.greaterThanOrEqual(1); 
        orders[0].price.should.be.equal(100); 
    });
    
    it('createOrder() test', async () => {
        let order = await controller.createOrder('1', '10:10', '1', 'Kim', ['test', 'test2'], 100)
        order.orderID.should.be.equal('1');
        order.time.should.be.equal('10:10');
        order.table.should.be.equal('1');
        order.waiter.should.be.equal('Kim');
        order.products.length.should.be.equal(2); 
        order.price.should.be.equal(100);
    });
})