import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../server/config/db';
import createTables from '../server/models/index';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);
let token; let token1;
const token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTM4NjkyNTAxLCJleHAiOjE1Mzg3Nzg5MDF9.tTzcOTlMRXA_xIV4cNdVRdI92dycV4b7W3oxeZfLhr';

describe('Clean up Db befor test', async () => {
  const client = await db.connect();
  try {
    await createTables();
    await client.query('DELETE FROM orders;');
    await client.query('DELETE FROM users;');
    await client.query('DELETE FROM meal;');
  //  console.log('i ran')
  } catch (e) {
    console.log(e);
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
        email: 'test@test.com',
        password: '123456',
        confirmPassword: '123456',
        firstName: 'test',
        lastName: 'user',
      })
      .end((err, res) => {
        token = res.body.data.token;
        expect(res).to.be.an('object');
        expect(res).to.have.status(201);
        // console.log(token);
        done();
      });
  });
});
