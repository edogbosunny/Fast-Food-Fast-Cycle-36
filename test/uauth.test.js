// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import db from '../server/config/db';
// import createTables from '../server/models/index';
// import app from '../app';

// const { expect } = chai;
// chai.use(chaiHttp);
// let token;


// after('Clean up Db befor test', async () => {
//   const client = await db.connect();
//   try {
//     await createTables();
//     await client.query('DELETE FROM orders;');
//     await client.query('DELETE FROM users;');
//     await client.query('DELETE FROM meal;');
//   //  console.log('i ran')
//   } catch (e) {
//     console.log(e);
//   } finally {
//     client.release();
//   }
// });


// describe('#default route /', () => {
//   it('#shoulld return 200 /', (done) => {
//     chai
//       .request(app)
//       .get('/')
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         done();
//       });
//   });
// });

// describe('#Signup /signup POST', () => {
//   it('#should return status 201 user created', (done) => {
//     chai
//       .request(app)
//       .post('/api/v1/auth/signup')
//       .send({
//         email: 'test@test.com',
//         password: '123456',
//         password2: '123456',
//         firstName: 'test',
//         lastName: 'user',
//       })
//       .end((err, res) => {
//         token = res.body.token;
//         expect(res).to.be.an('object');
//         expect(res).to.have.status(201);
//         console.log(token);
//         // expect(res.body.message).to.eqls('user with email already exists');

//         done();
//       });
//   });

//   it('#should return status 400 user exists', (done) => {
//     chai
//       .request(app)
//       .post('/api/v1/auth/signup')
//       .send({
//         email: 'test@test.com',
//         password: '123456',
//         password2: '123456',
//         firstName: 'test',
//         lastName: 'user',
//       })
//       .end((err, res) => {
//         token = res.body.token;
//         expect(res).to.be.an('object');
//         expect(res).to.have.status(400);
//         console.log(token);
//         expect(res.body.message).to.eqls('user already exists in database');

//         done();
//       });
//   });

//   it('#should return status 400 user exists', (done) => {
//     chai
//       .request(app)
//       .post('/api/v1/auth/signup')
//       .send({
//         email: '',
//         password: '',
//         password2: '',
//         firstName: '',
//         lastName: '',
//       })
//       .end((err, res) => {
//         // token = res.body.token;
//         expect(res).to.be.an('object');
//         expect(res).to.have.status(400);
//         done();
//       });
//   });

//   it('#user should be able to login', (done) => {
//     chai
//       .request(app)
//       .post('/api/v1/auth/login')
//       .send({
//         email: 'test@test.com',
//         password: '123456',
//       })
//       .end((err, res) => {
//         expect(res).to.have.status(201);
//         done();
//       });
//   });

//   it('#user return error on login', (done) => {
//     chai
//       .request(app)
//       .post('/api/v1/auth/login')
//       .send({
//         email: 'test1@test.com',
//         password: '123456',
//       })
//       .end((err, res) => {
//         expect(res).to.have.status(401);
//         done();
//       });
//   });

//   it('#user return error on login', (done) => {
//     chai
//       .request(app)
//       .post('/api/v1/auth/login')
//       .send({
//         email: '',
//         password: '',
//       })
//       .end((err, res) => {
//         expect(res).to.have.status(400);
//         done();
//       });
//   });

//   it('#user return error on invalid password', (done) => {
//     chai
//       .request(app)
//       .post('/api/v1/auth/login')
//       .send({
//         email: 'test1@test.com',
//         password: '1234567',
//       })
//       .end((err, res) => {
//         expect(res).to.have.status(401);
//         done();
//       });
//   });
// });
