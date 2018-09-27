import express from 'express';
import foodListController from '../controllers/foodListController';

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
router.get('/food', foodListController.getAllFoodItems);

// @route GET /api/v1/getorder/:id
// @desc  get single food by id
// @access public
router.get('/food/:id', foodListController.getSingleFoodItem);

// @route PUT /api/v1/getorder/:id
// @desc  update single food by id
// @access public
router.put('/food/:id', foodListController.updateFoodItem);

// @route POST /api/v1/createorder
// @desc  creates order route
// @access public
router.post('/food', foodListController.createFoodItem);

// @route DELETE /api/v1/getorder/:id
// @desc  delete single order by id
// @access public
router.delete('/food/:id', foodListController.deleteFood);

export default router;
