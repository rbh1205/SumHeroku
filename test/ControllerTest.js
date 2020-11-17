require('should');
const controller = require("../controller/controller");

//test af Controller test funktioner
describe('controller test - promise', function () {
    it('getProducts() test', async () => {
        let products = await controller.getProducts(); 
        products.length.should.be.greaterThanOrEqual(1); 
        products[0].name.should.be.equal('Banan');
        products[0].price.should.be.equal(3);
        products[0].category.should.be.equal('Madvarer');
    });

    it('createProduct() test', async () => {
        let product = await controller.createProduct('testCreateProduct', 100, 'testCreateCategory');
        product.name.should.be.equal('testCreateProduct');
        product.price.should.be.equal(100);
        product.category.should.be.equal('testCreateCategory');
    });

    // it('deleteProduct() test', async () => {
    //     let product2 = await controller.createProduct('testDeleteProduct', 150, 'testDeleteProduct')
    //     deleteProduct('d1');
    //     product2.productID.should.be.notEqual('d1');
    //     product2.name.should.be.notEqual('testDeleteProduct');
    //     product2.price.should.be.notEqual(150);
    //     product2.category.should.be.notEqual('testDeleteProduct');
    // })


    it('getOrders() test', async () => {
        let orders = await controller.getOrders(); 
        orders.length.should.be.greaterThanOrEqual(1); 
        orders[0].time.should.be.equal('1605516075894');
        orders[0].table.should.be.equal('1');
        orders[0].waiter.should.be.equal('Per');
        orders[0].products.length.should.be.greaterThanOrEqual(1); 
        orders[0].price.should.be.equal(540); 
        orders[0].comment.should.be.equal('')
    });
    
    it('createOrder() test', async () => {
        let order = await controller.createOrder('10:10', '1', 'Kim', ['test', 'test2'], 100, 'testComment')
        order.time.should.be.equal('10:10');
        order.table.should.be.equal('1');
        order.waiter.should.be.equal('Kim');
        order.products.length.should.be.equal(2); 
        order.price.should.be.equal(100);
        order.comment.should.be.equal('testComment')
    });

    it('deleteOrder() test', async () => {
        let order2 = await controller.createOrder('11:11', '2', 'Lars', ['test', 'test2'], 150, 'testComment')
        deleteOrder('2')
        order2.should.be.notEqual('11:11', '2', 'Lars', ['test', 'test2'], 150, 'testComment')
    })

});