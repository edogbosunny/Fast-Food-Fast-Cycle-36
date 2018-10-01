import dotenv from 'dotenv';

dotenv.config();

const defaultConfig = {
  tokenSecret: 'dhkmsgseieYhb79Nj' || process.env.TOKEN_SECRET,
};

export default defaultConfig;
