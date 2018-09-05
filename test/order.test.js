import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";

const { expect } = chai;
chai.use(chaiHttp);

describe("GET api/v1/getorder", () => {
  it("should return response 200", done => {
    chai
      .request(app)
      .get("/api/v1/getorder/")
      .end((err, res) => {
        if (err) done(err);
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
