// import Validator from 'validator';
import isEmpty from './is-empty';

const regex = /^[a-z0-9][a-z0-9-_]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;

const validateSigninInput = (data) => {
  const errors = {};

  if (isEmpty(data.password)) {
    errors.password = 'status field is Empty';
  }
  if ((data.password) < 6) {
    errors.password = 'password should bbe more than 6 characters';
  }
  if (isEmpty(data.email)) {
    errors.email = 'Email field is Empty';
  }
  if (!regex.test(data.email)) {
    errors.email = 'invalid email format';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateSigninInput;
