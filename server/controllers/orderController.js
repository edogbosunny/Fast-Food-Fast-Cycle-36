import db from '../models/orderDB';
import validateOrderInput from '../validation/order';
/**
 * Order Class
 */
class Order {
  /**
   * Create an order
   * @param {object} req:Request Object
   * @param {object} res: Response Object
   * @returns {object} Order Object
   */

  static createOrder(req, res) {
    // decopuling
    // let { orderId, meal, quantity, status, date } = req.body;
    const { date } = req.body;
    const { errors, isValid } = validateOrderInput(req.body);
    // check for validation here
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const order = {
      orderId: db.length + 1,
      meal: req.body.meal,
      quantity: req.body.quantity,
      status: 'pending',
      date: Date(date),
    };
    db.push(order);

    return res.status(201).json({
      success: 'true',
      message: 'Order Created Succesfully',
      order,
    });
  }

  /**
    * Get all others
    * @param {object} req:Order
    * @param {object} res:Order
    * @returns {object} Returns all others
    */
  static getAllOrders(req, res) {
    return res.send(db);
  }
  /**
    * Get Single others
    * @param {object} req:Order
    * @param {object} res:Order
    * @returns {object} Returns single others
  */

  static getSingleOrder(req, res) {
    const id = parseInt(req.params.id, 10);
    db.map((order) => {
      // console.log(order);
      if (order.orderId === id) {
        return res.status(200).json({
          success: 'true',
          message: 'order with given id retrieved',
          order,
        });
      }
      return null;
    });
    // console.log(req.params.id);
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

  static updateOrder(req, res) {
    const { errors, isValid } = validateOrderInput(req.body);
    const { date } = req.body;
    const id = parseInt(req.params.id, 10);
    let orderFound;
    let itemIndex;

    db.map((order, index) => {
      if (order.orderId === id) {
        orderFound = order;
        itemIndex = index;
        // console.log(order);
      }
      return null;
    });
    if (!orderFound) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newUpdatedOrder = {
      orderId: id,
      meal: req.body.meal || order.meal,
      quantity: req.body.quantity || order.quantity,
      status: 'pending',
      date: Date(date),
    };
    db.splice(itemIndex, 1, newUpdatedOrder);
    return res.status(201).send({
      success: 'true',
      message: 'Order Added Succesfully',
      newUpdatedOrder,
    });
  }

  /**
    * Delete Single others
    * @param {object} req:Order
    * @param {object} res:Order
    * @returns {object} Returns  others
  */

  static deleteOrder(req, res) {
    const id = parseInt(req.params.id, 10);
    db.map((delOrder, index) => {
      if (delOrder.orderId === id) {
        db.splice(index, 1);
        return res.status(200).json({
          success: 'true',
          message: 'Order Deleted Succesfully',
        });
      }
      return null;
    });
    return res.status(404).send({
      success: 'false',
      message: 'Order not found',
    });
  }
}

export default Order;
