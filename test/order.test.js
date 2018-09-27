import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';


const { expect } = chai;
chai.use(chaiHttp);

describe('GET api/v1/order/1', () => {
  it('should return response 200', (done) => {
    chai
      .request(app)
      .get('/api/v1/order/1')
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('order');
        expect(res.body.success).to.deep.equals('true');
        done();
      });
  });
});

describe('Delete api/v1/order/1', () => {
  it('should return response 200 after PUT', (done) => {
    chai
      .request(app)
      .del('/api/v1/order/1')
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.success).to.deep.equals('true');
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        done();
      });
  });
});

describe('Delete api/v1/order/1', () => {
  it('should return response 200 after PUT', (done) => {
    chai
      .request(app)
      .del('/api/v1/order/100')
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.success).to.deep.equals('false');
        expect(res).to.have.status(404);
        expect(res).to.be.an('object');
        done();
      });
  });
});

describe('PUT api/v1/order/1', () => {
  it('should return response 201 after PUT', (done) => {
    chai
      .request(app)
      .put('/api/v1/order/2')
      .send({ meal: '123', quantity: '123' })
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.success).to.deep.equals('true');
        expect(res).to.have.status(201);
        done();
      });
  });
});

describe('PUT api/v1/order/2', () => {
  it('should return response 404 after PUT', (done) => {
    chai
      .request(app)
      .put('/api/v1/order/100')
      .send({ meal: '123', quantity: '123' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});

describe('CREATE api/v1/order', () => {
  it('should return response 200 after create', (done) => {
    chai
      .request(app)
      .post('/api/v1/order')
      .send({ meal: 'rice', quantity: '123' })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('CREATE api/v1/order', () => {
  it('should return response 400 after create', (done) => {
    chai
      .request(app)
      .post('/api/v1/order')
      .send({ meal: '', quantity: '' })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(400);
        done();
      });
  });
});
