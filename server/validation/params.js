import isEmpty from './is-empty';

const reg = /^\d+$/;

const validateParams = (data) => {
  const errors = {};
  if (!reg.test(data.id)) {
    errors.params = 'Params value must be a number';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateParams;
