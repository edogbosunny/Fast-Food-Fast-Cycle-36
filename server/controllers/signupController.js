import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db';
import config from '../config/default';
import validateSignup from '../validation/signup';
import resonseStatus from '../helpers/returnStatus';

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
    const {
      firstName, lastName, email, password,
    } = req.body;
    let userRole; let token; let userId;
    const { errors, isValid } = validateSignup(req.body);
    if (!isValid) {
      return resonseStatus.sendResponse(res, 400, errors, false, null);
    }
    /**
     * Async Conneection to DB
     */
    const genSalt = bcrypt.genSaltSync(8);
    const hashPassword = bcrypt.hashSync(password, genSalt);
    const userQuery = 'SELECT * FROM users WHERE email = $1';
    // checck to see if email exists
    db.query(userQuery, [email])
      .then((userExist) => {
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
        userRole = 'user';
        const query = 'INSERT INTO users(email, hashpassword, firstname, lastname, user_role) VALUES ($1, $2, $3, $4, $5) RETURNING user_id ';
        db.query(query, [
          email,
          hashPassword,
          firstName,
          lastName,
          userRole,
        ]).then((resp) => {
          userId = resp.rows[0].user_id;
          token = jwt.sign({ id: userId }, config.tokenSecret, {
            expiresIn: 86400,
          });
          return res.status(201).json({
            status: true,
            data: {
              message: 'User account created successfully',
              token,
            },
          });
        });
        return null;
      })
      .catch(err => res.status(500).json({
        status: false,
        data: {
          message: 'Server encountered an error',
        },
      }));
    return null;
  }
}

export default signUp;
