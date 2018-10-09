// import Validator from 'validator';
import isEmpty from './is-empty';
import isIncorrect from './is-incorrect';

const validateStatusInput = (data) => {
  const statusError = {};

  if (!isIncorrect(data.status)) {
    statusError.status = 'incorrect status format';
  }
  if (data.status === undefined) {
    statusError.status = 'status field is undefined';
  }

  if (isEmpty(data.status)) {
    statusError.status = 'status field is Empty';
  }

  return {
    statusError,
    isVeryValid: isEmpty(statusError),
  };
};

export default validateStatusInput;
