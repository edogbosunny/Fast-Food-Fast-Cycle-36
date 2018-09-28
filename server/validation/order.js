import Validator from 'validator';
import isEmpty from './is-empty';

const validateOrderInput = (data) => {
  const errors = {};

  if (isEmpty(data.meal)) {
    errors.price = 'meal field is empty';
  }
  if (isEmpty(data.quantity)) {
    errors.quantity = 'quantity field is empty';
  }

  // data.meal = !isEmpty(data.meal) ? data.meal : '';
  // data.quantity = !isEmpty(data.quantity) ? data.quantity : '';

  // if (Validator.isEmpty(data.meal)) {
  //   errors.meal = 'meal field is not defined';
  // }

  // if (Validator.isEmpty(data.quantity)) {
  //   errors.quantity = 'product quantity field is undefined';
  // }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateOrderInput;
