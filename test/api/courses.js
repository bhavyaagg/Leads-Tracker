/**
 * Created by championswimmer on 13/07/17.
 */
const mocha = require('mocha')
    , chai = require('chai')
    , chaiHttp = require('chai-http')
    , expect = chai.expect
    , should = chai.should();

chai.use(chaiHttp)
const api = chai.request("http://localhost:8000/api/courses")

it("GET / should fetch error", (done) => {
    api.get("/").end((e, r) => {
        r.statusCode.should.equal(404);
        r.body.success.should.equal(false);
        r.body.error.message.should.be.a("string");
        done()
    })
})

it("POST /add should add a course", (done) => {
    api.post("/add").send({
        name: "Launchpad"
    }).end((e, r) => {
        r.statusCode.should.equal(201);
        r.body.success.should.equal(true);
        done()
    })
})

it("GET / should fetch all courses", (done) => {
    api.get("/").end((e, r) => {
        r.body.success.should.equal(true);
        r.body.data[0].name.should.equal("Launchpad");
        done()
    })
})

it("GET /1 should fetch Launchpad", (done) => {
    api.get("/1").end((e, r) => {
        r.statusCode.should.equal(200);
        r.body.success.should.equal(true);
        r.body.data.name.should.equal('Launchpad');
        done()
    })
})

it("GET /2 should fetch error", (done) => {
    api.get("/2").end((e, r) => {
        r.statusCode.should.equal(404);
        r.body.success.should.equal(false);
        r.body.error.message.should.be.a("string");
        done()
    })
})

it("DEL /1 should delete a course Launchpad", (done) => {
    api.delete("/1").end((e, r) => {
        r.body.success.should.equal(true);
        done()
    })
})

it("DEL /2 should fetch error", (done) => {
    api.delete("/2").end((e, r) => {
        r.statusCode.should.equal(404);
        r.body.success.should.equal(false);
        r.body.error.message.should.be.a("string");
        done()
    })
})