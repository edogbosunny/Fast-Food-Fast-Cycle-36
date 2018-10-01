import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db';
import config from '../config/default';
import validateSignup from '../validation/signup';

/**
 * Signup Validation class
 */

class signUp {
/**
 *
 * @param {object} req Takes signup Request
 * @param {object} res Responds to Signup Request
 */
  static signUpCtrl(req, res) {
    const { firstName, lastName, email, password } = req.body;
    let { userRole } = req.body;

    const { errors, isValid } = validateSignup(req.body);
    if (!isValid) {
      return res.status(400).json({ status: 'failed', token: null, error: errors });
    }
    /**
     * Async Conneection to DB
     */
    (async () => {
      try {
        const genSalt = bcrypt.genSaltSync(8);
        const hashPassword = bcrypt.hashSync(password, genSalt);
        const userQuery = 'SELECT * FROM users WHERE email = $1';
        // checck to see if email exists
        const userExist = await db.query(userQuery, [email]);
        if (userExist.rowCount > 0) {
          return res.status(400).json({ message: 'user already exists in database' });
        }
        // save user data to database
        userRole = 'user';
        const query = 'INSERT INTO users(email, hashpassword, firstname, lastname, user_role) VALUES ($1, $2, $3, $4, $5) RETURNING user_id ';
        const resp = await db.query(query, [email, hashPassword, firstName, lastName, userRole]);
        const userId = resp.rows[0].user_id;
        const token = jwt.sign({ id: userId }, config.tokenSecret, { expiresIn: 86400 });
        return res.status(200).json({ message: 'Signup Succesful', auth: true, token });
      } catch (err) {
        console.log('error ==>', err);
      }
    })().catch((err) => {
      console.log('500error ===>', err);
      return res.status(500).json({ auth: false, message: 'Failed to signup => Server Internal Server Error' });
    });
  }
}
export default signUp;
