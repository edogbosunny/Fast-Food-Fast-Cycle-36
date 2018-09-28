import db from '../models/orderDB';
import validateOrderItem from '../validation/order';

/**
 * Order Item Class
 */

class Order {
  /**
   * Create an order
   * @param {object} req:Request Object
   * @param {object} res: Response Object
   * @returns {object} Order Object
   */

  static createOrder(req, res) {
    const { date, meal, quantity } = req.body;
    const price = 500;
    const { errors, isValid } = validateOrderItem(req.body);
    const items = [];
    let itemsObj = {};
    const randNumb = Math.floor(Math.random() * 1000);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    itemsObj = { itemId: randNumb,
      meal,
      price: quantity * price,
      quantity,
      date: Date(date),
    };
    items.push(itemsObj);
    const orderItem = {
      orderId: db.length + 1,
      status: 'pending',
      items,
    };
    db.push(orderItem);
    return res.status(200).json({
      success: true,
      message: 'Order Created Succesfully',
      orderItem,
    });
  }
  /**
    * Get all order
    * @param {object} req:Order
    * @param {object} res:Order
    * @returns {object} Returns all order
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
    //   console.log(order);
      if (order.orderId === id) {
        return res.status(200).json({
          success: 'true',
          message: 'order with given id retrieved',
          order,
        });
      }
      return null;
    });
    return res.status(404).send({
      success: 'false',
      message: ' order not found',
    });
  }

  /**
      * Update Single others
      * @param {object} req:Order
      * @param {object} res:Order
      * @param {object} id:id variable
      * @returns {object} Returns updated others
    */
  static updateOrderItem(req, res) {
    const { date, meal, quantity } = req.body;
    const price = 500;
    const { errors, isValid } = validateOrderItem(req.body);
    const id = parseInt(req.params.id, 10);
    let orderFound;
    let itemIndex;

    db.map((order, index) => {
      if (order.orderId === id) {
        orderFound = order;
        itemIndex = index;
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
      meal: meal || order.meal,
      price: price || order.price,
      quantity: quantity || order.quantity,
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
