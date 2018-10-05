import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../server/config/db';
import createTables from '../server/models/index';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);
let token; let token1;

// clean db after every test

after('Clean up Db befor test', async () => {
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
        password2: '123456',
        firstName: 'test',
        lastName: 'user',
      })
      .end((err, res) => {
        token = res.body.token;
        expect(res).to.be.an('object');
        expect(res).to.have.status(201);
        // console.log(token);
        done();
      });
  });
  it('#return error 400', (done) => {
    chai
      .request(app)
      .post('/api/v1/menu')
      .set('x-access-token', token)
      .send({ meal: '', price: '' })
      .end((err, res) => {
        // console.log(err);
        console.log('---->', token);
        expect(res).to.be.an('object');
        expect(res).to.have.status(400);
        done();
      });
  });

  it('#should return status 400 user exists', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'test@test.com',
        password: '123456',
        password2: '123456',
        firstName: 'test',
        lastName: 'user',
      })
      .end((err, res) => {
        expect(res).to.be.an('object');
        expect(res).to.have.status(400);
        done();
      });
  });


  it('#should return status 400 password do not match exists', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'test5@test.com',
        password: '123456',
        password2: '1234556',
        firstName: 'test',
        lastName: 'user',
      })
      .end((err, res) => {
        // token = res.body.token;
        expect(res).to.be.an('object');
        expect(res).to.have.status(400);
        // console.log(token);
        done();
      });
  });


  it('#should return 400 status code empty string', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: '',
        password: '',
        password2: '',
        firstName: '',
        lastName: '',
      })
      .end((err, res) => {
        // token = res.body.token;
        expect(res).to.be.an('object');
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe('Login Route POST', () => {
  it('user should be able to login', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@test.com',
        password: '123456',
      })
      .end((err, res) => {
        token1 = res.body.token;
        console.log(token1);
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

  it('#user return error on invalid password status code 401', (done) => {
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

Zz

// });

//   it('# return status 200 after geting all menu', () => {
//     chai
//       .request(app)
//       .get('/api/v1/menu')
//       .set('x-access-token', token)
//       .end((err, res) => {
//         console.log(err);
//         expect(res).to.have.status(200);
//         expect(res).to.be.an('object');
//       });
//   });
//   it('#shoulld return error 401 when no token', (done) => {
//     chai
//       .request(app)
//       .post('/api/v1/menu')
//     //   .set('x-access-token', token)
//       .send({ meal: 'pie', price: '100' })
//       .end((err, res) => {
//         // console.log(err);
//         expect(res).to.be.an('object');
//         expect(res).to.have.status(401);
//         done();
//       });
//   });
//   it('#shoulld return error 400', (done) => {
//     chai
//       .request(app)
//       .post('/api/v1/orders')
//       .set('x-access-token', token)
//       .send({ mealId: '', quantity: '' })
//       .end((err, res) => {
//         // console.log(err);
//         expect(res).to.be.an('object');
//         expect(res).to.have.status(400);
//         // console.log(res);
//         done();
//       });
//   });

//   it('#shoulld post new order', (done) => {
//     chai
//       .request(app)
//       .post('/api/v1/orders')
//       .set('x-access-token', token)
//       .send({ mealId: '1', quantity: '1' })
//       .end((err, res) => {
//         console.log(err);
//         expect(res).to.be.an('object');
//         expect(res).to.have.status(400);
//         // console.log(res);
//         done();
//       });
//   });

//   it('#shoulld edit new order', (done) => {
//     chai
//       .request(app)
//       .put('/api/v1/orders/1')
//       .set('x-access-token', token)
//       .send({ status: 9 })
//       .end((err, res) => {
//         console.log(err);
//         expect(res).to.be.an('object');
//         expect(res).to.have.status(400);
//         // console.log(res);
//         done();
//       });
//   });

//   it('#shoulld edit new order', (done) => {
//     chai
//       .request(app)
//       .put('/api/v1/orders/1')
//       .set('x-access-token', token)
//       .send({ status: 'heheheh' })
//       .end((err, res) => {
//         console.log(err);
//         expect(res).to.be.an('object');
//         expect(res).to.have.status(400);
//         // console.log(res);
//         done();
//       });
//   });
//   it('#shoulld edit new order', (done) => {
//     chai
//       .request(app)
//       .get('/api/v1/orders')
//       .set('x-access-token', token)
//       .end((err, res) => {
//         console.log(err);
//         expect(res).to.be.an('object');
//         expect(res).to.have.status(200);
//         // console.log(res);
//         done();
//       });
//   });
// });
// // });
