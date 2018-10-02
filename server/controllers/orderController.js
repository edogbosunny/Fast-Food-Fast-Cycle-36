import validateOrder from '../validation/foodOrder';
import db from '../config/db';

/**
 * Food ORder Class
 */
class FoodOrder {
  /**
     *
     * @param {object} req Request
     * @param {object} res Response
     */
  static addOrder(req, res) {
    const userId = req.app.get('userId');
    const { mealId, quantity } = req.body;
    const reqId = Array.isArray(mealId) ? mealId : [mealId];

    const { errors, isValid } = validateOrder(req.body);
    // console.log(getOrderfromC(mealId));
    if (!userId) {
      console.log('User Id is not Set');
      return res.status(401).json({
        message: 'User Not Authenticated',
      });
    }
    if (!isValid) {
      return res.status(400).json(errors);
    }
    /**
     * Async method to connect to db
     */
    (async () => {
      try {
        const mealQuery = 'SELECT * FROM meal';
        const mealResp = await db.query(mealQuery);
        const mealR = mealResp.rows;
        // console.log(mealR);

        const getOrderForCart = (id) => {
          const orderValues = mealR.find(meal => meal.meal_id === id);
          //   console.log(orderValues);
          return orderValues;
        };

        // res.json(mealResp);
        const orderFromDb = reqId.map(val => getOrderForCart(parseInt(val, 10)));
        console.log('OrderfromDb===>', orderFromDb);
        const newOrderFromDb = orderFromDb;
        const findPrice = newOrderFromDb.map(val => parseInt(val.price, 10));
        console.log('price ===>', findPrice);
        // console.log(quantity);
        // const cost = (parseInt(findPrice, 10) * quantity);
        const arrQuant = Array.isArray(quantity) ? quantity : [quantity];
        const findQuant = quantity.map(val => parseInt(val, 10));
        // let xpr = arrQuant;
        console.log('quantity===>', findQuant);
    
        const strigifiedOrder = JSON.stringify(newOrderFromDb);

        console.log('Strigified==>', strigifiedOrder);
        let Amount;
        let totalAmount = 0;
        let arrQuantVal;
        // const totalQuant = 0;


        for (let i = 0; i < findPrice.length; i += 1) {
          arrQuantVal = arrQuant[i];
          Amount = findPrice[i] * arrQuant[i];
          totalAmount = Amount + totalAmount;
        //   return arrQuantVal;
        }
        let sum = findQuant.reduce((a, b) => a + b, 0);
        console.log(sum); // 6

        console.log(totalAmount);
        const orderQuery = 'INSERT INTO orders (user_id, status, quantity, cost) VALUES ($1, $2, $3, $4) RETURNING order_id';
        // const resp = await db.query(orderQuery, [userId, status]);
      } catch (err) {
        console.log(err);
      }
    })().catch((err) => {
      return res.status(500).json({
        success: false,
        message: 'Server encountered an error',
        err,
      });
    });
  }
}
export default FoodOrder;
