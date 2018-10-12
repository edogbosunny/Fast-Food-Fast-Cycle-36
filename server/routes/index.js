import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import foodmealController from '../controllers/foodmealController';
import foodOrderController from '../controllers/orderController';
import signupController from '../controllers/signupController';
import adminController from '../controllers/adminController';
import signinController from '../controllers/signinController';
import isAuthenticated from '../policy/isAuthenticated';
import isAdmin from '../policy/isAdmin';
import validateFoodOrder from '../validation/foodOrder';

const router = express.Router();
router.use(cors());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(express.static(path.resolve(__dirname, '../../UI/')));

// @route GET /api/v1/
// @desc  default home route
// @access public
router.get('/admin', adminController.seedAdmin);

// @route Post /api/v1/auth/signup
// @desc  signup route
// @access public
router.post('/auth/signup', signupController.signUpCtrl);

// @route Post /api/v1/auth/login
// @desc  login route
// @access public
router.post('/auth/login', signinController.signinCtr);

// -------Menu Routes below ---------//

// @route GET /api/v1/getorder
// @desc  get all order
// @access public
router.post('/menu', [
  isAuthenticated.authenticationCheck,
  isAdmin.isAdmin,
  foodmealController.addMealTooMenu,
]);

// @route GET /api/v1/menu
// @desc  get Available order
// @access public
router.get(
  '/menu',
  isAuthenticated.authenticationCheck,
  foodmealController.getAllMeal,
);

// Order Item Routes Starts Here

// @route GET /api/v1/getorder
// @desc  get all order
// @access public
router.get('/orders', [
  isAuthenticated.authenticationCheck,
  isAdmin.isAdmin,
  foodOrderController.getAllOrders,
]);

// @route GET /api/v1/getorder/:id
// @desc  get single food by id
// @access public
router.get('/orders/:id', [
  isAuthenticated.authenticationCheck,
  isAdmin.isAdmin,
  foodOrderController.getSingleOrder,
]);

// @route PUT /api/v1/orders/:id
// @desc  update single food by id
// @access public
router.put('/orders/:id', [
  isAuthenticated.authenticationCheck,
  isAdmin.isAdmin,
  foodOrderController.updateOrder,
]);

// @route POST /api/v1/orders
// @desc  creates order route
// @access public
router.post('/orders', [
  isAuthenticated.authenticationCheck,
  validateFoodOrder.validateOrderInput,
  foodOrderController.addOrder,
]);

// @route PUT /api/v1/users/:id/orders
// @desc  return user history
// @access private
router.get('/users/:id/orders', [
  isAuthenticated.authenticationCheck,
  foodOrderController.getUserOrderHistory,
]);

export default router;
