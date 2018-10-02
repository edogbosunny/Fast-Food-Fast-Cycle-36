import db from '../config/db';


/**
 * Creation of Food Meal Table
 */

const createMealTable = async () => {
  const client = await db.connect();
  try {
    const query = `CREATE TABLE IF NOT EXISTS meal (
            meal_id SERIAL UNIQUE,
            meal VARCHAR NOT NULL,
            price VARCHAR NOT NULL,
            created_on TIMESTAMPTZ DEFAULT NOW (),
            PRIMARY KEY (meal_id)

      );`;

    await client.query(query);
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
};
export default createMealTable;
