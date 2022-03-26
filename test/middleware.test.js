var chaiHttp = require("chai-http");
var chai = require("chai");
const app = require("../index");
const { expect } = require("chai");
chai.use(chaiHttp);

describe("Auth Testing", () => {
  it("Priavte Api with valid creds", () => {
    chai
      .request(app)
      .get("/private")
      .auth("keyur", "1234")
      .end((err, res) => {
        expect(res).to.have.status(200);
      });
  });

  it("Private Api with invalid creds", () => {
    const expectedResult = { status: 401, message: "Unauthorized" };
    chai
      .request(app)
      .get("/private")
      .auth("keyur", "4321")
      .end((err, res) => {
        expect(res.body).to.eql(expectedResult);
      });
  });

  it("public Api with valid creds", (done) => {
    chai
      .request(app)
      .get("/public")
      .auth("keyur", "1234")
      .end((err, res) => {
        done();
      });
  });

  it("public Api with invalid creds", (done) => {
    chai
      .request(app)
      .get("/public")
      .auth("keyur", "4321")
      .end((err, res) => {
        done();
      });
  });

  it("Private Api with no Auth header", () => {
    const expectedResult = { status: 401, message: "Unauthorized" };
    chai
      .request(app)
      .get("/private")
      .end((err, res) => {
        expect(res.body).to.eql(expectedResult);
      });
  });

  it("public Api with no Auth Header", (done) => {
    chai
      .request(app)
      .get("/public")
      .end((err, res) => {
        done();
      });
  });


});
