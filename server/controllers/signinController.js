import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db';
import config from '../config/default';
import validateSignin from '../validation/signin';
import sendResponse from '../helpers/returnStatus';

/**
 * Sign in class
 */

class signin {
  static signinCtr(req, res) {
    const { email, password } = req.body;
    const { errors, isValid } = validateSignin(req.body);
    let userRole;
    if (!isValid) {
      return res.status(400).json({
        status: false,
        data: {
          token: null,
          error: errors,
        },
      });
    }

    const userQuery = 'SELECT * FROM users WHERE email = $1';
    db.query(userQuery, [email])
      .then((user) => {
        userRole = user.rows[0].user_role;
        if (user.rows.length < 1) {
          const message = 'This user does not exists';
          sendResponse.sendResponse(res, 401, message, false, null);
        } else if (!bcrypt.compareSync(password, user.rows[0].hashpassword)) {
          const message = 'you have entered invalid credentials. please try again';
          return sendResponse.sendResponse(res, 401, message, true, null);
        } else {
          const userId = user.rows[0].user_id;
          const token = jwt.sign({ id: userId }, config.tokenSecret, {
            expiresIn: 86400,
          });
          const message = 'You have logged in successfully';
          return sendResponse.sendResponsewithID(res, 201, message, true, token, userId, userRole);
        }
        return null;
      })
      .catch((err) => {
        // console.log(err);
        const message = 'Internal Server Error!';
        return sendResponse.sendResponse40x(res, 500, message, false);
      });
    return null;
  }
}

export default signin;
