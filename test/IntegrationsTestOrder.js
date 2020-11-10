require('should');
const request = require('supertest');
const controller = require("../controller/controller");
const app = require('../app.js');
const { response } = require ('..app.js');

//Integrationstest af produkter
describe('integration test - promise', function () {
    
    it("get('/') test", function (){
        return request
            .get('/')
            .expect(200)
            .expect('Content-Type', /html/);
    });

    it("get('/Order') test", async () => {
        let response = await request(app)
            .get('/product')
            .expect(200)
            .expect('Content-Type', /json/);
        response.body.length.should.be.greaterThanOrEqual(1); 
        response.body[0].name.should.be.equal('testOrder');
    });

    it("post('/Order') test", async () => {
        let response = await request(app)
            .post('/Order')
            .send({
                'orderID' : 'testOrder2',
                'time' : 'testTime',
                'table' : 'testTable',
                'waiter' : 'testWaiter',
                'products' : [product1, product2],
                'price' : 100
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200);
        response.body.message.should.be.equal('Order saved!')
        response = await controller.getProducts(); 
        response.length.should.be.greaterThanOrEqual(2);
        response[response.length - 1].orderID.should.be.equal('testOrder2');
        response[response.length - 1].time.should.be.equal('testTime');
        response[response.length - 1].table.should.be.equal('testTable');
        response[response.length - 1].waiter.should.be.equal('testWaiter');
        response[response.length - 1].products.length.should.be.equal(2);
        response[response.length - 1].price.should.be.equal(100);
    });
    
    it('should return status 200 after DELETING a order', function(done) {
        return request
        .delete('/api/orders/' + order.orderID)
        .end(function(err, res){
            if(err) {
                throw err;
            }
            res.should.have.status(200);
            done(); 
        });
    });
})

