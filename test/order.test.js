import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";

const { expect, should } = chai;
chai.use(chaiHttp);

describe("GET api/v1/getorder", () => {
  it("should return response 200", done => {
    chai
      .request(app)
      .get("/api/v1/getorder/")
      .end((err, res) => {
        if (err) done(err);
        // expect(res.body.success).to.deep.equals("true");
        expect(res).to.have.status(200);
        expect(res).to.be.an("object");
        done();
      });
  });
});
describe("GET api/v1/getorder/1", () => {
  it("should return response 200", done => {
    chai
      .request(app)
      .get("/api/v1/getorder/1")
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("order");
        expect(res.body.success).to.deep.equals("true");
        done();
      });
  });
});

describe("Delete api/v1/getorder/2", () => {
  it("should return response 200 after PUT", done => {
    chai
      .request(app)
      .del("/api/v1/delorder/2")
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.success).to.deep.equals("true");
        expect(res).to.have.status(200);
        expect(res).to.be.an("object");
        done();
      });
  });
});



describe("PUT api/v1/getorder/2", () => {
  it("should return response 201 after PUT", done => {
    chai
      .request(app)
      .put("/api/v1/getorder/1")
      .send({ meal: "123", quantity: "123" })
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res.body.success).to.deep.equals("true");
        expect(res).to.have.status(201);
        done();
      });
  });
});

describe("CREATE api/v1/createorder", () => {
  it("should return response 200 after create", done => {
    chai
      .request(app)
      .post("/api/v1/createorder")
      .send({ meal: "rice", quantity: "123" })
      .end(function(err, res) {
        expect(res.body.success).to.deep.equals("true");
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        done();
      });
  });
});
