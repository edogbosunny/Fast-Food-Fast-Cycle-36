// import Validator from 'validator';
import isEmpty from './is-empty';

const validateOrderInput = (data) => {
  const errors = {};

  if (isEmpty(data.status)) {
    errors.status = 'status field is Empty';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateOrderInput;
