import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../server/config/db';
import createTables from '../server/models/index';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);
let token;
let token1;
const token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTM4NjkyNTAxLCJleHAiOjE1Mzg3Nzg5MDF9.tTzcOTlMRXA_xIV4cNdVRdI92dycV4b7W3oxeZfLhr';

before('Clean up Db befor test', async () => {
  const client = await db.connect();
  try {
    await createTables();
    await client.query('DELETE FROM users;');
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
});

describe('User should be able to Signup', () => {
  it('should return status 201 user created', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'user@user.com',
        password: '123456',
        confirmPassword: '123456',
        firstName: 'test',
        lastName: 'user',
      })
      .end((err, res) => {
        token = res.body.data.token;
        expect(res).to.be.an('object');
        expect(res).to.have.status(201);
        done();
      });
  });

  it('#should return status 400 if password do not match exists', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'test5@test.com',
        password: '123456',
        confirmPassword: '1234556',
        firstName: 'test',
        lastName: 'user',
      })
      .end((err, res) => {
        expect(res).to.be.an('object');
        expect(res).to.have.status(400);
        done();
      });
  });
  it('#should return 400 status code if empty string is entered', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
      })
      .end((err, res) => {
        expect(res).to.be.an('object');
        expect(res).to.have.status(400);
        done();
      });
  });
});

// Login Route
describe('User should login in wiyh a response of 201', () => {
  it('`should signup an admin user by default', (done) => {
    chai
      .request(app)
      .get('/api/v1/admin')
      .end((err, res) => {
        expect(res).to.be.an('object');
        expect(res).to.have.status(201);
        done();
      });
  });
  it('user should be able to login with admin acount', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'admin@admin.com',
        password: '123456',
      })
      .end((err, res) => {
        token1 = res.body.data.token;
        expect(res).to.have.status(201);
        done();
      });
  });
  it('#user return error on login user does not exist', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test1@test.com',
        password: '123456',
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
  it('#should return 400 error on empty string', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: '',
        password: '',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('user return error on invalid password status code 401', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test1@test.com',
        password: '1234567',
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});
