// import Validator from 'validator';
import isEmpty from './is-empty';

const reg = /^\d+$/;

const validateOrderInput = (data) => {
  const errors = {};
  if (!reg.test(data.mealId)) {
    errors.mealId = 'Meal id must be a number';
  }
  if (isEmpty(data.mealId)) {
    errors.mealId = 'meal Id field is Empty';
  }
  if (!reg.test(data.quantity)) {
    errors.quantity = 'Quantity value must be a number';
  }
  // if (data.quantity !== Number) {
  //   errors.quantity = 'Invalid quantity character entered';
  // }
  if (isEmpty(data.quantity)) {
    errors.quantity = 'quantity field is Empty';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateOrderInput;
