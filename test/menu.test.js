import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../server/config/db';
import createTables from '../server/models/index';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);
let token;
let userToken;

before('Clean up Db befor test', async () => {
  const client = await db.connect();
  try {
    await createTables();
    await client.query('DELETE FROM meal;');
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
});

describe('seed admin user  ', () => {
  it('user should be able to login with admin acount', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'admin@admin.com',
        password: '123456',
      })
      .end((err, res) => {
        // console.log(res);
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
});
describe('#food menu test', () => {
  it('#return status 201 after adding meal', (done) => {
    chai
      .request(app)
      .post('/api/v1/menu')
      .set('x-access-token', token)
      .send({ meal: 'coconut rice', price: 500 })
      .end((err, res) => {
        expect(res).to.be.an('object');
        expect(res).to.have.status(201);
        done();
      });
  });

  it('#return status 401  when unauthorized user try to login', (done) => {
    chai
      .request(app)
      .post('/api/v1/menu')
      .set('x-access-token', userToken)
      .send({ meal: 'coconut rice', price: 500 })
      .end((err, res) => {
        expect(res).to.be.an('object');
        expect(res).to.have.status(401);
        done();
      });
  });

  it('price value must be an Number', (done) => {
    chai
      .request(app)
      .post('/api/v1/menu')
      .set('x-access-token', token)
      .send({ meal: 'coconut rice', price: 'sss' })
      .end((err, res) => {
        expect(res).to.be.an('object');
        expect(res).to.have.status(400);
        done();
      });
  });

  it('#return error 401 if empty strings is added inputed', (done) => {
    chai
      .request(app)
      .post('/api/v1/menu')
      // .set('x-access-token', token)
      .send({ meal: '', price: '' })
      .end((err, res) => {
        // console.log(err);
        // console.log('---->', token);
        expect(res).to.be.an('object');
        expect(res).to.have.status(401);
        done();
      });
  });
  it('# return status 200 after geting all menu', () => {
    chai
      .request(app)
      .get('/api/v1/menu')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
      });
  });
  it('# return status 400 no token provided', () => {
    chai
      .request(app)
      .get('/api/v1/menu')
      // .set('x-access-token', token)
      .end((err, res) => {
        console.log(err);
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
      });
  });
});
