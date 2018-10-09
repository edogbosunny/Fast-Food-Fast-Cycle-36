import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../server/config/db';
import createTables from '../server/models/index';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);
let token;
let userToken;

after('Clean up Db befor test', async () => {
  const client = await db.connect();
  try {
    await createTables();
    await client.query('DROP TABLE orders;');
    await client.query('DROP TABLE meal;');
    await client.query('DROP TABLE users;');
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
});

describe('seed admin user', () => {
  it('user should be able to login with admin acount', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'admin@admin.com',
        password: '123456',
      })
      .end((err, res) => {
        token = res.body.data.token;
        expect(res).to.have.status(201);
        done();
      });
  });
  it('user should be able to login with user acount', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'user@user.com',
        password: '123456',
      })
      .end((err, res) => {
        userToken = res.body.data.token;
        expect(res).to.have.status(201);
        done();
      });
  });

  it('should return status 201 on adding order', (done) => {
    chai
      .request(app)
      .post('/api/v1/orders')
      .set('x-access-token', token)
      .send({ mealId: '1', quantity: '1' })
      .end((err, res) => {
        // console.log(err);
        expect(res).to.have.status(201);
        done();
      });
  });

  it('should return status 400 on adding empty order', (done) => {
    chai
      .request(app)
      .post('/api/v1/orders')
      .set('x-access-token', token)
      .send({ mealId: '', quantity: '' })
      .end((err, res) => {
        // console.log(err);
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should return status 201 on getting order', (done) => {
    chai
      .request(app)
      .get('/api/v1/orders')
      .set('x-access-token', token)
      .end((err, res) => {
        // console.log(err);
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should return status 201 on geting user order history', (done) => {
    chai
      .request(app)
      .get('/api/v1/users/2/orders')
      .set('x-access-token', token)
      .end((err, res) => {
        // console.log(res);
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should return status 2000 on geting single user order', (done) => {
    chai
      .request(app)
      .get('/api/v1/orders/1')
      .set('x-access-token', token)
      .end((err, res) => {
        // console.log(res);
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should return status 400 on for invalid params in the url', (done) => {
    chai
      .request(app)
      .get('/api/v1/orders/h')
      .set('x-access-token', token)
      .end((err, res) => {
        // console.log(res);
        expect(res).to.have.status(400);
        done();
      });
  });
  it('should return status 201 on updating user order history', (done) => {
    chai
      .request(app)
      .put('/api/v1/orders/1')
      .set('x-access-token', token)
      .send({ status: 'new' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
