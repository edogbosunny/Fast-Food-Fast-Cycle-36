
import isEmpty from './is-empty';
import statusResponse from '../helpers/returnStatus';

class foodOrder {
  static validateOrderInput(req, res, next) {
    const { mealId, quantity } = req.body;
    const reg = /^\d+$/;
    const errors = {};
    if (mealId === undefined || quantity === undefined) {
      errors.fatalError = 'Meal Id or Quantity Id is undefined';
      return statusResponse.sendResponseErr(res, 400, false, errors);
    }
    const newMealId = Array.isArray(mealId) ? mealId : [mealId];
    const newQuantity = Array.isArray(quantity) ? quantity : [quantity];
    newMealId.forEach((refinedData) => {
      // console.log(typeof refinedData);
      if (!reg.test(refinedData)) {
        errors.meal = 'Meal ID must be a number';
      }
    });
    newQuantity.forEach((refinedData) => {
      // console.log(typeof refinedData);
      if (!reg.test(refinedData)) {
        errors.quantity = 'Quantity value must be a number';
      }
    });
    if (!isEmpty(errors)) {
      return statusResponse.sendResponseErr(res, 400, false, errors);
    }
    return next();
  }
}

export default foodOrder;
