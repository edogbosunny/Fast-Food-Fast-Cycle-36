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
  // data.meal = !isEmpty(data.meal) ? data.meal : '';
  // data.price = !isEmpty(data.price) ? data.price : '';

  // if (Validator.isEmpty(data.meal)) {
  //   errors.meal = 'meal field is empty';
  // }

  // if (Validator.isEmpty(data.price)) {
  //   errors.price = 'product price field is empty';
  // }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateOrderInput;
