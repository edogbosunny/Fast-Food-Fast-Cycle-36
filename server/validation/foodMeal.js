// import Validator from 'validator';
import isEmpty from './is-empty';

// const mealValidation = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
const mealValidation = /^([a-zA-Z0-9 _-]+)$/;
const validateOrderInput = (data) => {
  const errors = {};

  if (!mealValidation.test(data.meal)) {
    errors.meal = 'Only underscore (_) and dash (-) special characters are allowed';
  }
  if (isEmpty(data.meal)) {
    errors.meal = 'meal field is empty';
  }


  if (data.price !== Number) {
    errors.price = 'Price must be a Number';
  }
  if (isEmpty(data.price)) {
    errors.price = 'price field is empty';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateOrderInput;
