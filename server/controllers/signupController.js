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
    const { errors, isValid } = validateSignup(req.body);
    if (!isValid) {
      return res.status(400).json({
        status: false,
        data: {
          error: errors,
          token: null,
        },
      });
    }
    /**
     * Async Conneection to DB
     */
    const genSalt = bcrypt.genSaltSync(8);
    const hashPassword = bcrypt.hashSync(password, genSalt);
    const userQuery = 'SELECT * FROM users WHERE email = $1';
    // checck to see if email exists
    db.query(userQuery, [email]).then((userExist) => {
      // console.log('===>usereqist==>', userExist);
      if (userExist.rowCount > 0) {
        return res.status(400).json({
          status: true,
          data: {
            message: 'User already exists in the database',
            token,
          },
        });
      }

      // seed first user to the db as an admind
      const adminQuery = 'SELECT * FROM users';
      db.query(adminQuery).then((adminResp) => {
        const adminRows = adminResp.rows[0];
        // console.log('=========>', adminRows.length);
        if (adminRows === undefined || adminRows.length === 0) {
          userRole = 'admin';
          const adminInsQuery = 'INSERT INTO users(email, hashpassword, firstname, lastname, user_role) VALUES ($1, $2, $3, $4, $5) RETURNING user_id ';

          db.query(adminInsQuery, [email, hashPassword, firstName, lastName, userRole]).then((resp) => {
            userId = resp.rows[0].user_id;
            token = jwt.sign({ id: userId }, config.tokenSecret,
              { expiresIn: 86400 });
            return res.status(201).json({
              status: true,
              data: {
                message: 'User account created successfully',
                token,
              },
            });
          });
        }
      });
      userRole = 'user';
      const query = 'INSERT INTO users(email, hashpassword, firstname, lastname, user_role) VALUES ($1, $2, $3, $4, $5) RETURNING user_id ';
      db.query(query, [email, hashPassword, firstName, lastName, userRole]).then((resp) => {
        userId = resp.rows[0].user_id;
        token = jwt.sign({ id: userId }, config.tokenSecret, { expiresIn: 86400 });
        return res.status(201).json({
          status: true,
          data: {
            message: 'User account created successfully',
            token,
          },
        });
      });
    }).catch((err) => {
      return res.status(500).json({
        status: false,
        data: {
          message: 'Server encountered an error',
        },
      });
    });
  }
}

export default signUp;
