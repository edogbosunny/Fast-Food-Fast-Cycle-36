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
    let userRole;
    let token;
    let userId;
    // const { userRole } = req.body;

    // userRole = req.body.userRole;
    // console.log(userRole);

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

        // seed first user to the db as an admind
        const adminQuery = 'SELECT * FROM users';
        const adminResp = await db.query(adminQuery);
        const adminRows = adminResp.rows[0];
        // console.log('=========>', adminRows.length);
        if (adminRows === undefined || adminRows.length === 0) {
          userRole = 'admin';
          const adminInsQuery = 'INSERT INTO users(email, hashpassword, firstname, lastname, user_role) VALUES ($1, $2, $3, $4, $5) RETURNING user_id ';
          const resp = await db.query(adminInsQuery, [email, hashPassword, firstName, lastName, userRole]);
          userId = resp.rows[0].user_id;
          token = jwt.sign({ id: userId }, config.tokenSecret,
            { expiresIn: 86400 });
          return res.status(200).json({ message: 'Signup Succesful', auth: true, token });
        }
        // console.log(adminResp);

        // save user data to database
        userRole = 'user';
        const query = 'INSERT INTO users(email, hashpassword, firstname, lastname, user_role) VALUES ($1, $2, $3, $4, $5) RETURNING user_id ';
        const resp = await db.query(query, [email, hashPassword, firstName, lastName, userRole]);
        userId = resp.rows[0].user_id;
        token = jwt.sign({ id: userId }, config.tokenSecret, { expiresIn: 86400 });
        return res.status(200).json({ message: 'Signup Succesful', auth: true, token });

        // seed first user to have admin role
        // const adminQuery = 'INSERT INTO USERS'
        // const adminResp = await db.query()
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
