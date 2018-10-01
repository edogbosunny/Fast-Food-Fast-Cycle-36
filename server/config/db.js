import { Pool } from 'pg';
import dotenv from 'dotenv';
import dbURI from './keys';

dotenv.config();
const connectionString = dbURI.psqlURI;

const pool = new Pool({
  connectionString,
});
/**
 * Kill application if error occours in db
 */
pool.on('error', (err) => {
  console.error('Fatall Error ==> Client is idle', err.stack);
  // end pool
  pool.end();
  process.exit(-1);
});

/**
 * Notify user when DB is connected
 */
pool.on('connect', () => {
  console.log('PgSql Database ===> Connected');
});
/**
 * Close DB when not in use
 */
process.on('SIGINT', () => {
  console.log('Closing Database ==> Connection');
  pool.end()
  // callback to make sure that the close was succesful
    .then(() => {
      console.log('Database Closed Succesfully ==> ');
    }).catch((err) => {
      console.log(err);
    });
});
export default pool;
