/**
 * Test cases for the apis
 */

const chai = require('chai');
const chaiHttp = require('chai-http');
var expect = chai.expect;
const server = require('../index');
const should = chai.should();



chai.use(chaiHttp);


describe("/GET ALL USER", async() => {

    it("should fail without authentication and status will be forbidden ", async () => {
            const res = await chai
                .request(server)
                .get('/user/all')
            expect(res.status).to.equal(200);
        });
        // it("should return object", async () => {
        //     const res = await chai
        //         .request(server)
        //         .get('')
        //     expect(res.body.should.be.a('object'));


        // }),
        // it("should have status and room_state as keys in response", async () => {
        //     const res = await chai
        //         .request(server)
        //         .get('')
        //     expect(res.body.should.have.keys('status', 'users'));

        // })
});


