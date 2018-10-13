// import Validator from 'validator';
import isEmpty from './is-empty';

const regex = /^[a-z0-9][a-z0-9-_]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;
const nameValidation = /^([a-zA-Z0-9 _-]+)$/;
const validateSigninInput = (data) => {
  const errors = {};

  if (!nameValidation.test(data.firstName)) {
    errors.firstName = 'Only underscore (_) and dash (-) special characters are allowed';
  }
  if (
    isEmpty(data.firstName)
    || data.firstName.length < 2
    || data.firstName.length > 15
  ) {
    errors.firstName = 'First name must contain a min of 2 characters and max 15 characters';
  }
  if (isEmpty(data.firstName)) {
    errors.firstName = 'First name field is empty';
  }

  if (!nameValidation.test(data.lastName)) {
    errors.lastName = 'Only underscore (_) and dash (-) special characters are allowed';
  }
  if (
    isEmpty(data.lastName)
    || data.lastName.length < 2
    || data.lastName.length > 15
  ) {
    errors.lastName = 'Last name must contain a min of 2 characters and max 15 characters';
  }
  if (isEmpty(data.lastName)) {
    errors.lastName = 'Last name field is empty';
  }

  if (!regex.test(data.email)) {
    errors.email = 'You have entered an invalid email';
  }
  if (isEmpty(data.email)) {
    errors.email = 'Email field is empty';
  }

  if (
    isEmpty(data.password)
    || data.password.length <= 5
    || data.password.length >= 15
  ) {
    errors.password = 'Password name must contain a min of 5 characters and max 15 characters';
  }
  if (isEmpty(data.password)) {
    errors.password = 'Password field is empty';
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateSigninInput;
