import express from 'express';
import foodmealController from '../controllers/foodmealController';
import foodOrderController from '../controllers/orderController';
import signupController from '../controllers/signupController';
import signinController from '../controllers/signinController';
import isAuthenticated from '../policy/isAuthenticated';
import isAdmin from '../policy/isAdmin';

const router = express.Router();

// @route GET /api/v1/
// @desc  default home route
// @access public
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'Successful',
    description: 'welcome to the default API Route',
    message: 'To Acces routes please see Readme on my github repo',
    repoUrl: 'http://???',
  });
});

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
router.post('/menu', [isAuthenticated.authenticationCheck,
  isAdmin.isAdmin,
  foodmealController.addMealTooMenu]);

// @route GET /api/v1/menu
// @desc  get Available order
// @access public
router.get('/menu', foodmealController.getAllMeal);

// @route GET /api/v1/getorder/:id
// @desc  get single food by id
// @access public
// router.get('/food/:id', foodListController.getSingleFoodItem);

// @route PUT /api/v1/getorder/:id
// @desc  update single food by id
// @access public
// router.put('/food/:id', foodListController.updateFoodItem);

// @route POST /api/v1/createorder
// @desc  creates order route
// @access public
// router.post('/menu', foodListController.createFoodItem);

// @route DELETE /api/v1/getorder/:id
// @desc  delete single order by id
// @access public
// router.delete('/food/:id', foodListController.deleteFood);


// Order Item Routes Starts Here


// @route GET /api/v1/getorder
// @desc  get all order
// @access public
router.get('/orders', [isAuthenticated.authenticationCheck,
  isAdmin.isAdmin,
  foodOrderController.getAllOrders]);

// @route GET /api/v1/getorder/:id
// @desc  get single food by id
// @access public
router.get('/orders/:id', [isAuthenticated.authenticationCheck,
  isAdmin.isAdmin,
  foodOrderController.getSingleOrder]);


// @route PUT /api/v1/orders/:id
// @desc  update single food by id
// @access public
router.put('/orders/:id', [isAuthenticated.authenticationCheck,
  isAdmin.isAdmin, foodOrderController.updateOrder]);

// @route PUT /api/v1/users/:id/orders
// @desc  return user history
// @access private
router.get('/users/:id/orders', [isAuthenticated.authenticationCheck,
  foodOrderController.getUserOrderHistory]);


// @route POST /api/v1/orders
// @desc  creates order route
// @access public
router.post('/orders', [isAuthenticated.authenticationCheck,
  foodOrderController.addOrder]);

// @route DELETE /api/v1/getorder/:id
// @desc  delete single order by id
// @access public
// router.delete('/order/:id', foodOrderController.deleteOrder);

export default router;
