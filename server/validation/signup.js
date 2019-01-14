// import Validator from 'validator';
import isEmpty from './is-empty';

const regex = /^[a-z0-9][a-z0-9-_]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;
const nameValidation = /^([a-zA-Z0-9 _-]+)$/;
const validateSigninInput = (data) => {
  const errors = {};

  if (!nameValidation.test(data.firstname)) {
    errors.firstname = 'Only underscore (_) and dash (-) special characters are allowed';
  }
  if (
    isEmpty(data.firstname)
    || data.firstname.length < 2
    || data.firstname.length > 15
  ) {
    errors.firstname = 'First name must contain a min of 2 characters and max 15 characters';
  }
  if (isEmpty(data.firstname)) {
    errors.firstname = 'First name field is empty';
  }

  if (!nameValidation.test(data.lastname)) {
    errors.lastname = 'Only underscore (_) and dash (-) special characters are allowed';
  }
  if (
    isEmpty(data.lastname)
    || data.lastname.length < 2
    || data.lastname.length > 15
  ) {
    errors.lastname = 'Last name must contain a min of 2 characters and max 15 characters';
  }
  if (isEmpty(data.lastname)) {
    errors.lastname = 'Last name field is empty';
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

  if (data.password !== data.confirmpassword) {
    errors.confirmpassword = 'Passwords do not match';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateSigninInput;
