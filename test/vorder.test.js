// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import db from '../server/config/db';
// import createTables from '../server/models/index';
// import app from '../app';

// const { expect } = chai;
// chai.use(chaiHttp);
// let token;

// describe('Clean up Db befor test', async () => {
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
// // after('Clean up Db befor test', async () => {
// //   const client = await db.connect();
// //   try {
// //     await createTables();
// //     await client.query('DELETE FROM orders;');
// //     await client.query('DELETE FROM users;');
// //     await client.query('DELETE FROM meal;');
// //   //  console.log('i ran')
// //   } catch (e) {
// //     console.log(e);
// //   } finally {
// //     client.release();
// //   }
// // });

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
// });

// describe('#orderCnrtoler Test', () => {
//   it('#Users should add food to menu', (done) => {
//     chai
//       .request(app)
//       .post('/api/v1/menu')
//       .set('x-access-token', token)
//       .send({ meal: 'pie', price: '100' })
//       .end((err, res) => {
//         console.log(err);
//         expect(res).to.be.an('object');
//         expect(res).to.have.status(201);
//         done();
//       });
//   });
// });
// describe('#test order', () => {
//   it('#should be able to add order /POST', (done) => {
//     chai
//       .request(app)
//       .post('/api/v1/orders')
//       .set('x-access-token', token)
//       .send({ mealId: '1', quantity: '1' })
//       .end((err, res) => {
//         // console.log(err);
//         expect(res).to.be.an('object');
//         expect(res).to.have.status(201);
//         done();
//       });
//   });
// });
