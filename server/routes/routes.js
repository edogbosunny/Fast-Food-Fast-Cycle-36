import express from 'express';
import orderController from '../controllers/orderController';

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

// @route GET /api/v1/getorder
// @desc  get all order
// @access public
router.get('/getorder', orderController.getAllOrders);


// @route GET /api/v1/getorder/:id
// @desc  get single order by id
// @access public
router.get('/getorder/:id', orderController.getSingleOrder);

// @route PUT /api/v1/getorder/:id
// @desc  update single order by id
// @access public
router.put('/getorder/:id', orderController.updateOrder);

// @route POST /api/v1/createorder
// @desc  creates order route
// @access public
router.post('/createorder', orderController.createOrder);

// @route DELETE /api/v1/getorder/:id
// @desc  delete single order by id
// @access public
router.delete('/delorder/:id', orderController.deleteOrder);

export default router;
