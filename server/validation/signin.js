// import Validator from 'validator';
import isEmpty from './is-empty';

const regex = /^[a-z0-9][a-z0-9-_]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;

const validateSigninInput = (data) => {
  const errors = {};

  if (!regex.test(data.email)) {
    errors.email = 'invalid email format';
  }
  if (isEmpty(data.email)) {
    errors.email = 'Email field is Empty';
  }

  if (
    isEmpty(data.password)
    || data.password.length <= 5
    || data.password.length >= 15
  ) {
    errors.password = 'password must be more than 6 characters';
  }
  if (isEmpty(data.password)) {
    errors.password = 'password field is Empty';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateSigninInput;
