import dotenv from 'dotenv';
import prod from './keys_prod';
import dev from './keys_dev';
import test from './keys_test';

dotenv.config();

if (process.env.NODE_ENV === 'production') {
  module.exports = prod;
} else if (process.env.NODE_ENV === 'test') {
  module.exports = test;
} else {
  module.exports = dev;
}
