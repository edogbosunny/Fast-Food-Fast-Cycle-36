import db from '../models/foodList';
import validateFoodInput from '../validation/foodList';

/**
 * Food List Item Class
 */

class FoodItem {
  /**
   * Create an FoodItem
   * @param {object} req:Request Object
   * @param {object} res: Response Object
   * @returns {object} Order Object
   */
  static createFoodItem(req, res) {
    // decopuling
    const { meal, price } = req.body;
    const { errors, isValid } = validateFoodInput(req.body);

    if (!isValid) {
      return res.status(400).json({ status: false,
        data: {
          errors,
        } });
    }
    const foodItem = {
      foodId: db.length + 1,
      meal,
      price,
      date: Date(),
    };
    db.push(foodItem);
    return res.status(200).json({
      success: true,
      message: 'Food Created Succesfully',
    });
  }

  /**
    * Get all food
    * @param {object} req:Order
    * @param {object} res:Order
    * @returns {object} Returns all food
    */

  static getAllFoodItems(req, res) {
    return res.send(db);
  }
  /**
    * Get Single others
    * @param {object} req:Order
    * @param {object} res:Order
    * @returns {object} Returns single others
  */

  static getSingleFoodItem(req, res) {
    const id = parseInt(req.params.id, 10);
    db.map((food) => {
      console.log(food);
      if (food.foodId === id) {
        return res.status(200).json({
          success: 'true',
          message: 'order with given id retrieved',
          food,
        });
      }
      return null;
    });
    return res.status(404).send({
      success: 'false',
      message: 'user order not found',
    });
  }

  /**
      * Update Single others
      * @param {object} req:Order
      * @param {object} res:Order
      * @param {object} id:id variable
      * @returns {object} Returns updated others
    */
  static updateFoodItem(req, res) {
    const { errors, isValid } = validateFoodInput(req.body);
    const { date, meal, price } = req.body;
    const id = parseInt(req.params.id, 10);
    let foodFound;
    let itemIndex;

    db.map((food, index) => {
      if (food.foodId === id) {
        foodFound = food;
        itemIndex = index;
      }
      return null;
    });
    if (!foodFound) {
      return res.status(404).json({
        success: false,
        message: 'Food not found',
      });
    }
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newUpdatedFood = {
      foodId: id,
      meal: meal || foodFound.meal,
      price: price || foodFound.price,
      date: Date(date),
    };
    db.splice(itemIndex, 1, newUpdatedFood);
    return res.status(201).send({
      success: 'true',
      message: 'Order Added Succesfully',
      newUpdatedFood,
    });
  }

  /**
    * Delete Single others
    * @param {object} req:Order
    * @param {object} res:Order
    * @returns {object} Returns  others
  */
  static deleteFood(req, res) {
    const id = parseInt(req.params.id, 10);
    const del = db.map((delFood, index) => {
      if (delFood.foodId === id) {
        db.splice(index, 1);
        return res.status(200).json({
          success: 'true',
          message: 'Food Deleted Succesfully',
        });
      }
      return del;
    });
    return res.status(404).send({
      success: 'false',
      message: 'Food not found',
    });
  }
}
export default FoodItem;
