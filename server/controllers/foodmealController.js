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
        message: 'Unautorized Access please login' });
    }
    if (!isValid) {
      return res.status(400).json(errors);
    }
    (async () => {
      try {
        const query = 'INSERT INTO meal (meal, price) VALUES ($1, $2) RETURNING *';
        const resp = await db.query(query, [meal, price]);
        res.status(201).json({
          message: 'product Uploaded Succesfully',
          data: { createdOn: Date.now(), meal: resp.rows[0].meal, price: resp.rows[0].price },
        });
      } catch (e) {
        console.log(e);
      }
    })().catch((err) => {
      return res.status(500).json({
        success: false,
        message: 'Server encountered an error',
        err,
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
    try {
      (async () => {
        const resp = await db.query(query);
        res.status(200).json({
          message: 'Food Menu Retrieved succesfully',
          count: resp.rowCount,
          data: resp.rows,
        });
      })().catch((err) => {
        console.log(err);
        return res.status(500).json({
          message: 'An error encountered on the server',
          success: false,
        });
      });
    } catch (e) {
      console.log(e);
    }
  }
}
export default Foodmeal;
