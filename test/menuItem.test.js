// /**
//  * Menu item test
//  */
// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import db from '../server/config/db';
// import app from '../app';
// import createTables from '../server/models/index';

// const { expect } = chai;
// chai.use(chaiHttp);

// let token;
// // const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjUsImlhdCI6MTUzODYwMjM2NCwiZXhwIjoxNTM4Njg4NzY0fQ.iVshpozIhMjVwLVKltq7iwJwFi7RcOVV2J-wfN2L-aY';

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


// describe('#Testing for  food items ', () => {
//   it('#User should signup first as db is flushed after test', (done) => {
//     chai
//       . request(app)
//       .post('/api/v1/auth/signup')
//       .send({
//         email: 'test@test.com',
//         password: '123456',
//         password2: '123456',
//         firstName: 'test',
//         lastName: 'user',
//       })
//       .end((err, res) => {
//         // console.log(err);
//         token = res.body.token;
//         expect(res).to.have.status(201);
//         expect(res.body.message).to.eqls('Signup Succesful');
//         console.log(token);
//         done();
//       });
//   });
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
//   it('#return error 400', (done) => {
//     chai
//       .request(app)
//       .post('/api/v1/menu')
//       .set('x-access-token', token)
//       .send({ meal: '', price: '' })
//       .end((err, res) => {
//         // console.log(err);
//         expect(res).to.be.an('object');
//         expect(res).to.have.status(400);
//         done();
//       });
//   });
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
//         console.log(err);
//         expect(res).to.be.an('object');
//         expect(res).to.have.status(401);
//         done();
//       });
//   });
// });
