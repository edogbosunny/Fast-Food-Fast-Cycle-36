import { isNumber } from 'util';
import validateOrder from '../validation/foodOrder';
import validateStatusInput from '../validation/status';
import db from '../config/db';
import validateParams from '../validation/params';

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
    const status = 'new';
    const reqId = Array.isArray(mealId) ? mealId : [mealId];
    const { errors, isValid } = validateOrder(req.body);
    if (!userId) {
      return res
        .status(401)
        .json({ status: false, data: { message: 'User Not Authenticated' } });
    }
    if (!isValid) {
      return res.status(400).json({ status: false, data: { errors } });
    }
    /**
     * Async method to connect to db
     */
    const mealQuery = 'SELECT * FROM meal';
    db.query(mealQuery)
      .then((mealResp) => {
        const mealR = mealResp.rows;
        if (mealR.length === 0) {
          return res
            .status(400)
            .json({
              status: false,
              data: {
                message:
                  'Meal not Availabe at the moment please try again later',
              },
            });
        }
        const getOrderForCart = (id) => {
          const orderValues = mealR.find(meal => meal.meal_id === id);
          return orderValues;
        };
        const orderFromDb = reqId.map(val => getOrderForCart(parseInt(val, 10)));
        const newOrderFromDb = orderFromDb;
        const findPrice = newOrderFromDb.map(val => parseInt(val.price, 10));
        const arrQuant = Array.isArray(quantity) ? quantity : [quantity];
        const findQuant = arrQuant.map(val => parseInt(val, 10));
        if (findPrice.length !== findQuant.length) {
          return res
            .status(400)
            .json({
              status: false,
              data: {
                message: 'No of meal id does not match quantity selected',
              },
            });
        }
        if (findPrice.length !== findQuant.length) {
          res
            .status(500)
            .json({
              status: false,
              data: {
                message:
                  'Unable to process request. make sure menu id and quantity params match',
              },
            });
        }
        const strigifiedOrder = JSON.stringify(newOrderFromDb);
        let Amount;
        let totalAmount = 0;
        let arrQuantVal;
        for (let i = 0; i < findPrice.length; i += 1) {
          arrQuantVal = arrQuant[i];
          Amount = findPrice[i] * arrQuant[i];
          totalAmount = Amount + totalAmount;
        }
        const totalQuantity = findQuant.reduce((a, b) => a + b, 0);
        const orderQuery = 'INSERT INTO orders (user_id, status, quantity, cost, mealitem) VALUES ($1, $2, $3, $4, $5) RETURNING order_id';
        db.query(orderQuery, [
          userId,
          status,
          totalQuantity,
          totalAmount,
          strigifiedOrder,
        ]).then(resp => res.status(201).json({
          status: true,
          data: {
            message: 'Your order has been successfully created',
            status,
            OrderId: resp.rows[0].order_id,
            quantity: totalQuantity,
            TotalCost: totalAmount,
            newOrderFromDb,
          },
        }));
        return null;
      })
      .catch((err) => {
        console.log(err);
      });
    return null;
  }

  /**
   * get All Food MEnu Meals
   */
  static getAllOrders(req, res) {
    const query = 'SELECT * FROM orders';
    /**
     * Async Dm method here
     */
    db.query(query).then((resp) => {
      if (resp.rows.length === 0) {
        return res.status(200).json({
          status: false,
          data: {
            message: 'No order found for this user ',
          },
        });
      }
      const dataArr = resp.rows;
      const response = dataArr.map((product, i) => {
        const parsedRes = JSON.parse(product.mealitem);
        product.mealitem = parsedRes;
        return product;
      });
      res.status(200).json({
        status: true,
        data: {
          message: 'Food order retrieved succesfully',
          count: resp.rowCount,
          data: response,
        },
      });
      return null;
    });
    return null;
  }

  static getUserOrderHistory(req, res) {
    const { id } = req.params;
    const userId = req.app.get('userId');
    if (!userId) {
      return res.status(403).json({
        status: false,
        data: {
          message:
            'User is not Authenticated. Please log in to access this route',
        },
      });
    }
    if (parseInt(id, 10) !== userId) {
      return res.status(400).json({
        status: false,
        data: {
          message:
            'Error! cannot view order History - Incorrect parameter entered',
        },
      });
    }
    const userHistoryQuery = `SELECT o.order_id, o.mealitem,o.created_on, o.quantity, o.cost, o.status, u.user_id, u.lastname, u.firstname  FROM orders
     as o INNER JOIN users AS u ON o.user_id = u.user_id WHERE u.user_id = $1`;

    db.query(userHistoryQuery, [id]).then((resp) => {
      const response = resp.rows[0];
      if (response === undefined) {
        return res.status(400).json({
          status: false,
          data: {
            message: 'User order history does not exist for this user',
          },
        });
      }
      const stringifyMealdata = response.mealitem;
      const newConvertedData = JSON.parse(stringifyMealdata);
      res.status(200).json({
        status: true,
        data: {
          message: 'User order history retrieved successfully',
          orderId: response.order_id,
          status: response.status,
          quantity: response.quantity,
          cost: response.cost,
          userId: response.user_id,
          mealItem: newConvertedData,
        },
      });
      return null;
    });
    return null;
  }

  static getSingleOrder(req, res) {
    const { id } = req.params;
    const { errors, isValid } = validateParams(req.params);
    if (!isValid) {
      return res.status(400).json({
        status: false,
        data: { errors },
      });
    }
    const userId = req.app.get('userId');
    if (!userId) {
      return res.status(401).json({
        status: false,
        data: {
          message:
            'User is not Authenticated. Please log in to access this route',
        },
      });
    }
    const singleOrderQuery = `SELECT o.order_id, o.mealitem,o.created_on, o.quantity, o.cost, o.status, u.user_id, u.lastname, u.firstname  FROM orders as o
    INNER JOIN users AS u ON o.user_id = u.user_id WHERE o.order_id = $1`;

    db.query(singleOrderQuery, [id]).then((resp) => {
      // console.log('resp====>', resp.rows.length);
      if (resp.rows.length === 0) {
        return res.status(400).json({
          status: false,
          data: 'requested order does not exist',
        });
      }
      const response = resp.rows[0];
      const stringifyMealdata = response.mealitem;
      const newConvertedData = JSON.parse(stringifyMealdata);
      res.status(200).json({
        status: true,
        data: {
          message: 'Single user order retrieved successfully',
          orderId: response.order_id,
          quantity: response.quantity,
          cost: response.cost,
          userId: response.user_id,
          lastName: response.lastname,
          firstName: response.sunny,
          mealItem: newConvertedData,
        },
      });
      return null;
    });
    return null;
  }

  static updateOrder(req, res) {
    const { id } = req.params;
    const { errors, isValid } = validateParams(req.params);
    if (!isValid) {
      return res.status(400).json({
        status: false,
        data: { errors },
      });
    }
    const { status } = req.body;
    // const userId = req.app.get('userId');

    const updateQuery = 'UPDATE orders SET status = $1 WHERE order_id = $2 RETURNING *';
    if (!isValid) {
      return res.status(400).json({
        status: false,
        data: {
          token: null,
          error: errors,
        },
      });
    }
    db.query(updateQuery, [status, id]).then((resp) => {
      const response = resp.rows[0];
      const stringifyMealdata = response.mealitem;
      const newConvertedData = JSON.parse(stringifyMealdata);
      res.status(200).json({
        status: 'true',
        data: {
          message: 'User order has been updated succesfully',
          orderId: response.order_id,
          status: response.status,
          quantity: response.quantity,
          cost: response.cost,
          userId: response.user_id,
          lastName: response.lastname,
          firstName: response.sunny,
          mealItem: newConvertedData,
        },
      });
    });
    return null;
  }
}
export default FoodOrder;
