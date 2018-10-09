import db from '../config/db';
/**
 * Admin
 */
class Admin {
  /**
   * check to see if user is an admin
   * @param {object} req:Request Object
   * @param {object} res:Response Object
   * @param {object} next:Next Object
   * @returns {object} Admin Object
   */
  static isAdmin(req, res, next) {
    const userId = req.app.get('userId');
    const query = 'SELECT user_role from users WHERE user_id = $1';
    (async () => {
      try {
        const resp = await db.query(query, [userId]);
        // console.log('resp=======>', resp.rows[0].user_role);
        const userRole = resp.rows[0].user_role;
        if (userRole === 'user') {
          return res.status(401).json({
            status: false,
            message:
              'Unauthorized Access You must be an admin to access this page',
          });
        }
        req.app.set('user_role', userRole);
        next();
      } catch (e) {
        // console.log(e);
      }
      return null;
    })().catch((err) => {
      console.log(err);
      return res.status(500).json({
        error: true,
        message: 'internal server error',
      });
    });
  }
}

export default Admin;
