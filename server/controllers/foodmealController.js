import validateFoodInp from '../validation/foodMeal';

import db from '../config/db';

class Foodmeal {
  /**
     *
     * @param {object} req req: data from body
     * @param {object } res res: ddata from body
     */
  static addMealTooMenu(req, res) {
    const userId = req.app.get('userId');
    const { meal, price } = req.body;
    const { errors, isValid } = validateFoodInp(req.body);

    if (!userId) {
      console.error('User id was not set');
      return res.status(401).json({
        status: false,
        data: {
          message: 'Unauthorized access please login',
        },
      });
    }
    if (!isValid) {
      return res.status(400).json({
        status: false,
        data: {
          error: errors,
        },
      });
    }


    const query = 'INSERT INTO meal (meal, price) VALUES ($1, $2) RETURNING *';
    db.query(query, [meal, price]).then((resp) => {
      return res.status(201).json({
        message: 'Your product has been uploaded successfully',
        data: { createdOn: Date.now(), meal: resp.rows[0].meal, price: resp.rows[0].price },
      });
    });
  }
  /**
   * get All Food MEnu Meals
   */

  static getAllMeal(req, res) {
    const query = 'SELECT m.meal_id, m.price, m.meal FROM meal as m';

    /**
     * Async Dm method here
     */
    db.query(query).then((resp) => {
      res.status(200).json({
        message: 'Food menu has been retrieved succesfully',
        count: resp.rowCount,
        data: resp.rows,
      });
    })().catch((err) => {
      // console.log(err);
      return res.status(500).json({
        status: false,
        data: {
          message: 'An error encountered on the server',
        },
      });
    });
  }
}
export default Foodmeal;
