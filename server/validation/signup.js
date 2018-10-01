// import Validator from 'validator';
import isEmpty from './is-empty';

const regex = /^[a-z0-9][a-z0-9-_]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;

const validateSigninInput = (data) => {
  const errors = {};

  if ((isEmpty(data.firstName)) || (data.firstName).length < 2 || (data.firstName).length > 15) {
    errors.firstName = 'First Name must contain a min of 2 characters and max 15 characters';
  }
  if (isEmpty(data.firstName)) {
    errors.firstName = 'First Name field is Empty';
  }

  if ((isEmpty(data.lastName)) || (data.lastName).length < 2 || (data.lastName).length > 15) {
    errors.lastName = 'Last Name must contain a min of 2 characters and max 15 characters';
  }
  if (isEmpty(data.lastName)) {
    errors.lastName = 'Last Name field is Empty';
  }

  if (!regex.test(data.email)) {
    errors.email = 'invalid email format';
  }
  if (isEmpty(data.email)) {
    errors.email = 'Email field is Empty';
  }

  if ((isEmpty(data.password)) || (data.password).length <= 5 || (data.password).length >= 15) {
    errors.password = 'password must be more than 6 characters';
  }
  if (isEmpty(data.password)) {
    errors.password = 'password field is Empty';
  }

  if (data.password !== data.password2) {
    errors.comfirmPassword = 'Passwords do not match';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateSigninInput;
