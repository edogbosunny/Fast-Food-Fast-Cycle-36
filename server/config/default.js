import dotenv from 'dotenv';

dotenv.config();

const defaultConfig = {
  tokenSecret: 'dhkmsgseihb79kjfh' || process.env.TOKEN_SECRET,
};

export default defaultConfig;
