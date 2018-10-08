// import Validator from 'validator';
import isEmpty from './is-empty';
import isIncorrect from './is-incorrect';

const validateStatusInput = (data) => {
  const errors = {};

  if (!isIncorrect(data.status)) {
    errors.status = 'incorrect status format';
  }

  if (isEmpty(data.status)) {
    errors.status = 'status field is Empty';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateStatusInput;
