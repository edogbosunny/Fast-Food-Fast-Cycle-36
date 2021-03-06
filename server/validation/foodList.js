// import Validator from 'validator';
import isEmpty from './is-empty';

const validateOrderInput = (data) => {
  const errors = {};

  if (isEmpty(data.price)) {
    errors.price = 'product price field is empty';
  }
  if (isEmpty(data.meal)) {
    errors.meal = 'meal field is empty';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateOrderInput;
