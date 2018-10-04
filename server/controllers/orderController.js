import validateOrder from '../validation/foodOrder';
import validateStatusInput from '../validation/status';
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
    const status = 'New';
    // console.log(quantity)
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
        if (mealR.length === 0) {
          return res.status(400).json({ message: 'Meal not Availabe at the moment please try again later' });
        }
        const getOrderForCart = (id) => {
          const orderValues = mealR.find(meal => meal.meal_id === id);
          //   console.log(orderValues);
          return orderValues;
        };

        // res.json(mealResp);
        const orderFromDb = reqId.map(val => getOrderForCart(parseInt(val, 10)));
        // console.log('OrderfromDb===>', orderFromDb);
        const newOrderFromDb = orderFromDb;

        const findPrice = newOrderFromDb.map(val => parseInt(val.price, 10));
        // if (val.price === undefined) {
        //   return res.status(400).json({
        //     message: 'product not available',
        //   });
        // }
        console.log('price ===>', findPrice);
        // console.log(quantity);
        // const cost = (parseInt(findPrice, 10) * quantity);
        const arrQuant = Array.isArray(quantity) ? quantity : [quantity];
        // console.log('====================>', arrQuant);
        const findQuant = arrQuant.map(val => parseInt(val, 10));
        // console.log('====================>', arrQuant);
        // let xpr = arrQuant;
        if (findPrice.length !== findQuant.length) {
          return res.status(400).json({ message: 'No of meal id does not match quantity selected' });
        }
        console.log('quantity===>', findQuant);
        if ((findPrice).length !== (findQuant).length) {
          res.status(500).json({
            message: 'Unable to process request. make sure menu id and quantity params match',
          });
        }
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
          console.log(arrQuantVal);
        }
        const totalQuantity = findQuant.reduce((a, b) => a + b, 0);
        console.log('tq=====>', totalQuantity); // 6

        console.log(totalAmount);
        const orderQuery = 'INSERT INTO orders (user_id, status, quantity, cost, mealitem) VALUES ($1, $2, $3, $4, $5) RETURNING order_id';
        const resp = await db.query(orderQuery, [userId, status, totalQuantity, totalAmount, strigifiedOrder]);
        console.log('===rows===>', resp.rows[0].order_id);

        return res.status(201).json({
          message: 'Order Succesfull',
          status,
          OrderId: resp.rows[0].order_id,
          quantuty: totalQuantity,
          TotalCost: totalAmount,
          newOrderFromDb,
        });
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

  /**
   * get All Food MEnu Meals
   */

  static getAllOrders(req, res) {
    const query = 'SELECT * FROM orders';

    /**
     * Async Dm method here
     */
    try {
      (async () => {
        const resp = await db.query(query);
        res.status(200).json({
          message: 'Food Order Retrieved succesfully',
          count: resp.rowCount,
          data: resp.rows,
        });
      })().catch((err) => {
        console.log(err);
        return res.status(500).json({
          message: 'An error encountered on the server',
          success: false,
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  static getUserOrderHistory(req, res) {
    const { id } = req.params;
    const userId = req.app.get('userId');
    if (!userId) {
      console.error('User id was not set');
      return res.status(500).json({
        message: 'An error encountered on the server' });
    }
    if (parseInt(id, 10) !== userId) {
      return res.status(400).json({
        message: 'Error! cannot view order History - Incorrect user Id entered',
      });
    }
    const userHistoryQuery = `SELECT o.order_id, o.mealitem,o.created_on, o.quantity, o.cost, o.status, u.user_id, u.lastname, u.firstname  FROM orders
     as o INNER JOIN users AS u ON o.user_id = u.user_id WHERE u.user_id = $1`;
    (async () => {
      try {
        const resp = await db.query(userHistoryQuery, [id]);
        // console.log('=====>', resp);
        const response = resp.rows[0];
        if (response === undefined) {
          return res.status(400).json({
            message: 'User order history does not exist for this user',
          });
        }
        const stringifyMealdata = response.mealitem;
        const newConvertedData = JSON.parse(stringifyMealdata);
        res.status(200).json({
          message: 'User order History Retrieved Succesfully',
          orderId: response.order_id,
          quantity: response.quantity,
          cost: response.cost,
          userId: response.user_id,
          lastName: response.lastname,
          firstName: response.sunny,
          mealItem: newConvertedData,
        });
      } catch (e) {
        throw e;
      }
    })().catch((err) => {
      console.log('err======', err);
      return res.status(500).json({
        message: 'An error encountered on the server',
        // success: false
      });
    });
  }

  static getSingleOrder(req, res) {
    const { id } = req.params;
    const userId = req.app.get('userId');
    if (!userId) {
      console.log('User Id is not Set');
      return res.status(401).json({
        message: 'User Not Authenticated',
      });
    }
    const singleOrderQuery = `SELECT o.order_id, o.mealitem,o.created_on, o.quantity, o.cost, o.status, u.user_id, u.lastname, u.firstname  FROM orders as o
    INNER JOIN users AS u ON o.user_id = u.user_id WHERE o.order_id = $1`;
    (async () => {
      try {
        const resp = await db.query(singleOrderQuery, [id]);
        // console.log('resp====>', resp);
        const response = resp.rows[0];
        const stringifyMealdata = response.mealitem;
        const newConvertedData = JSON.parse(stringifyMealdata);
        res.status(200).json({
          message: 'Single User order Retrieved Succesfully',
          orderId: response.order_id,
          quantity: response.quantity,
          cost: response.cost,
          userId: response.user_id,
          lastName: response.lastname,
          firstName: response.sunny,
          mealItem: newConvertedData,
        });
      } catch (e) {
        throw e;
      }
    })().catch((err) => {
      console.log('err======', err);
      return res.status(500).json({
        message: 'An error encountered on the server',
        // success: false
      });
    });
  }

  static updateOrder(req, res) {
    // console.log(req.params);
    const { id } = req.params;
    const { errors, isValid } = validateStatusInput(req.body);
    const { status } = req.body;
    // const userId = req.app.get('userId');

    const updateQuery = 'UPDATE orders SET status = $1 WHERE order_id = $2 RETURNING *';
    if (!isValid) {
      return res.status(400).json({ status: 'failed', token: null, error: errors });
    }
    (async () => {
      try {
        const resp = await db.query(updateQuery, [status, id]);
        const response = resp.rows[0];
        const stringifyMealdata = response.mealitem;
        const newConvertedData = JSON.parse(stringifyMealdata);
        res.status(200).json({
          message: 'success',
          orderId: response.order_id,
          status: response.status,
          quantity: response.quantity,
          cost: response.cost,
          userId: response.user_id,
          lastName: response.lastname,
          firstName: response.sunny,
          mealItem: newConvertedData });
      } catch (e) { console.log(e); }
    })().catch((err) => {
      console.log(err);
      return res.status(500).json({ statuc: 'failed', message: 'server error' });
    });
  }
}
export default FoodOrder;
