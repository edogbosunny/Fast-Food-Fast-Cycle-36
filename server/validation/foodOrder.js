
import isEmpty from './is-empty';
import statusResponse from '../helpers/returnStatus';

class foodOrder {
  static validateOrderInput(req, res, next) {
    const { mealId, quantity } = req.body;
    const reg = /^\d+$/;
    const errors = {};
    if (!reg.test(mealId)) {
      errors.mealId = 'Meal id must be a number';
    }
    if (isEmpty(mealId)) {
      errors.mealId = 'meal Id field is Empty';
    }
    if (!reg.test(quantity)) {
      errors.quantity = 'Quantity value must be a number';
    }
    // if (data.quantity !== Number) {
    //   errors.quantity = 'Invalid quantity character entered';
    // }
    if (isEmpty(quantity)) {
      errors.quantity = 'quantity field is Empty';
    }
    if (!isEmpty(errors)) {
      return statusResponse.sendResponseErr(res, 400, false, errors);
    }
    return next();
  }
}


export default foodOrder;
