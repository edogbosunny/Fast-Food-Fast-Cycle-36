// import db from '../models/orderDB';
// import validateOrderInput from '../validation/order';
// import foodList from '../models/foodList';

// /**
//  * Order Item Class
//  */

// class Order {
//   static getOrdersForCart(id) {
//     const orderValues = foodList.find(food => food.foodId === id);
//     return orderValues;
//     // refractor to return error response if not found.
//   }
//   /**
//    * Factor the logic here to check to see if foodid === id then return error
//    * Create an order
//    * @param {object} req:Request Object
//    * @param {object} res: Response Object
//    * @returns {object} Order Object
//    */

//   static createOrder(req, res) {
//     const { errors, isValid } = validateOrderInput(req.body);
//     const { id, quantity } = req.body;
//     if (!isValid) {
//       return res.status(400).json(errors);
//     }

//     const reqId = Array.isArray(id) ? id : [id];
//     // console.log(reqId);
//     const meal = reqId.map(val => Order.getOrdersForCart(parseInt(val, 10)));
//     const foodBasket = {
//       orderId: db.length + 1,
//       quantity,
//       status: 'pending',
//       meal,
//     };
//     db.push(foodBasket);
//     res.status(200).json({
//       foodBasket,
//     });
//   }

//   /**
//   * Get all order
//   * @param {object} req:Order
//   * @param {object} res:Order
//   * @returns {object} Returns all order
//   */
//   static getAllOrders(req, res) {
//     return res.send(db);
//   }

//   /**
//   * Get Single others
//   * @param {object} req:Order
//   * @param {object} res:Order
//   * @returns {object} Returns single others
// */
//   static getSingleOrder(req, res) {
//     const id = parseInt(req.params.id, 10);
//     const singleOrder = db.find(order => order.orderId === id);
//     // console.log(singleOrder);
//     if (singleOrder) {
//       return res.status(200).json({
//         success: 'true',
//         message: 'order with given id retrieved',
//         singleOrder,
//       });
//     }
//     return res.status(400).json({
//       success: 'false',
//       message: `Order with order-id ${id} does not exist`,
//     });
//   }

//   /**
//     * Update Single others
//     * @param {object} req:Order
//     * @param {object} res:Order
//     * @param {object} id:id variable
//     * @returns {object} Returns updated others
//   */
//   static updateOrderItem(req, res) {
//     // const stat = db[0].status;
//     const { errors, isValid } = validateOrderInput(req.body);
//     const { status } = req.body;
//     console.log(typeof status);
//     const id = parseInt(req.params.id, 10);
//     const orderFound = db.find(order => order.orderId === id, 10);
//     const orderIndex = db.findIndex((orderInd => orderInd.orderId === id));
//     console.log(orderIndex);
//     console.log(orderFound.status);
//     if (!orderFound) {
//       return res.status(404).json({
//         success: false,
//         message: 'Order not found',
//       });
//     }
//     if (!isValid) {
//       return res.status(400).json(errors);
//     }
//     // const newUpdatedOrder = {
//     //   status: status || orderFound.status,
//     // };

//     if (status === 'pending' || status === 'completed' || status === 'accepted') {
//       // db.splice(orderFound, 1, newUpdatedOrder);
//       const newUpdatedOrder = db[orderIndex].status = status || orderFound.status;
//       return res.status(201).send({
//         success: 'true',
//         message: 'Order Added Succesfully',
//         newUpdatedOrder,

//       });
//     }
//     return res.status(404).json({
//       error: 'true',
//       message: 'invalid text entered',
//     });
//   }

//   /**
//   * Delete Single others
//   * @param {object} req:Order
//   * @param {object} res:Order
//   * @returns {object} Returns  others
// */
//   static deleteOrder(req, res) {
//     const id = parseInt(req.params.id, 10);
//     db.map((delOrder, index) => {
//       if (delOrder.orderId === id) {
//         db.splice(index, 1);
//         return res.status(200).json({
//           success: 'true',
//           message: 'This order has been deleted successfully',
//         });
//       }
//       return null;
//     });
//     return res.status(404).send({
//       success: 'false',
//       message: 'This order is not found',
//     });
//   }
// }

// export default Order;
