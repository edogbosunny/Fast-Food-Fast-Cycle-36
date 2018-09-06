import db from "../models/orderDB";
import validateOrderInput from "../validation/order";

class Order {
  static createOrder(req, res) {
    //decopuling
    // let { orderId, meal, quantity, status, date } = req.body;
    let { date } = req.body;
    const { errors, isValid } = validateOrderInput(req.body);
    //check for validation here
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const order = {
      orderId: db.length + 1,
      meal: req.body.meal,
      quantity: req.body.quantity,
      status: "pending",
      date: Date(date)
    };
    db.push(order);

    return res.status(201).json({
      success: "true",
      message: "Order Created Succesfully",
      order
    });
  }

  //static getother method
  static getAllOrders(req, res) {
    return res.send(db);
  }
  //fetch a specific order by id
  static getSingleOrder(req, res) {
    const id = parseInt(req.params.id, 10);
    db.map(order => {
      //console.log(order);
      if (order.orderId === id) {
        return res.status(200).json({
          success: "true",
          message: "order with given id retrieved",
          order: order
        });
      }
    });
    // console.log(req.params.id);
    return res.status(404).send({
      success: "false",
      message: `user order not found`
    });
  }
  //create another method to edit order
  static updateOrder(req, res) {
    const { errors, isValid } = validateOrderInput(req.body);
    let { date } = req.body;
    const id = parseInt(req.params.id, 10);
    let orderFound;
    let itemIndex;

    db.map((order, index) => {
      if (order.orderId === id) {
        orderFound = order;
        itemIndex = index;
        // console.log(order);
      }
    });
    if (!orderFound) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }
    if (!isValid) {
      return res.status(400).json(errors);
    } else {
      const newUpdatedOrder = {
        orderId: id,
        meal: req.body.meal || order.meal,
        quantity: req.body.quantity || order.quantity,
        status: "pending",
        date: Date(date)
      };
      db.splice(itemIndex, 1, newUpdatedOrder);
      return res.status(201).send({
        success: "true",
        message: "Order Added Succesfully",
        newUpdatedOrder
      });
    }
  }

  //to delete an order
  static deleteOrder(req, res) {
    const id = parseInt(req.params.id);
    db.map((delOrder, index) => {
      if (delOrder.orderId === id) {
        db.splice(index, 1);
        return res.status(200).json({
          success: "true",
          message: "Order Deleted Succesfully"
        });
      }
    });
    return res.status(404).send({
      success: "false",
      message: "Order not found"
    });
  }
}

export default Order;
