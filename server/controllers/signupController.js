import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db';
import config from '../config/default';
import validateSignup from '../validation/signup';
import responseStatus from '../helpers/returnStatus';

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
    const userIdNo = req.app.get('userId');
    const {
      firstname, lastname, email, password,
    } = req.body;
    let userRole; let token; let userId;
    const { errors, isValid } = validateSignup(req.body);
    if (!isValid) {
      return responseStatus.sendResponseErr(res, 400, false, errors);
    }
    const genSalt = bcrypt.genSaltSync(8);
    const hashPassword = bcrypt.hashSync(password, genSalt);
    const userQuery = 'SELECT * FROM users WHERE email = $1';
    // checck to see if email exists
    db.query(userQuery, [email])
      .then((userExist) => {
        // console.log('===>usereqist==>', userExist);
        if (userExist.rowCount > 0) {
          const message = 'User already exists in the database';
          return responseStatus.sendResponse(res, 400, message, false, token);
        }
        userRole = 'user';
        const query = 'INSERT INTO users(email, hashpassword, firstname, lastname, user_role) VALUES ($1, $2, $3, $4, $5) RETURNING user_id ';
        db.query(query, [email, hashPassword, firstname, lastname, userRole])
          .then((resp) => {
            userId = resp.rows[0].user_id;
            token = jwt.sign({ id: userId }, config.tokenSecret, {
              expiresIn: 86400,
            });
            const message = 'User account created successfully';
            return responseStatus.sendResponse(res, 201, message, true, token, userIdNo);
          });
        return null;
      })
      .catch((err) => {
        const message = 'Internal Server Error!';
        return responseStatus.sendResponse40x(res, 500, message, false);
      });
    return null;
  }
}

export default signUp;
