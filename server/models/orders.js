import db from '../config/db';

/**
 * Create Users Table
 */

const createOrdersTable = async () => {
  const client = await db.connect();
  try {
    const query = `CREATE TABLE IF NOT EXISTS orders (
          order_id SERIAL UNIQUE,
          user_id SERIAL NOT NULL REFERENCES users (user_id),
          status VARCHAR NOT NULL,
          quantity VARCHAR NOT NULL,
          cost VARCHAR NOT NULL,
          mealitem VARCHAR NOT NULL, 
          created_on TIMESTAMPTZ DEFAULT NOW (),
          PRIMARY KEY(order_id)
      );`;

    await client.query(query);
  } catch (e) {
    throw e;
  } finally {
    client.release();
  }
};
export default createOrdersTable;
