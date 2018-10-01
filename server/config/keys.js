import dotenv from 'dotenv';
import prod from './keys_prod';
import dev from './keys_dev';

dotenv.config();

if (process.env.NODE_ENV === 'production') {
  module.exports = prod;
} else {
  module.exports = dev;
}
