// import Validator from 'validator';
import isEmpty from './is-empty';

const validateOrderInput = (data) => {
  const errors = {};

  // if (isEmpty(data.id)) {
  //   errors.price = 'id field is empty';
  // }
  // if (isEmpty(data.quantity)) {
  //   errors.quantity = 'quantity field is empty';
  // }


  // data.meal = !isEmpty(data.meal) ? data.meal : '';
  // data.quantity = !isEmpty(data.quantity) ? data.quantity : '';

  // if (Validator.isEmpty(data.meal)) {
  //   errors.meal = 'meal field is not defined';
  // }

  // if ((data.status) !== 'pending' || (data.status) !== 'completed') {
  //   errors.status = 'incorrect status entered';
  // }
  if (isEmpty(data.status)) {
    errors.status = 'status field is Empty';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateOrderInput;
