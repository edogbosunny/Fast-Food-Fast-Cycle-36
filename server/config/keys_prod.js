import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  psqlURI: process.env.PSQL_URI,
};
