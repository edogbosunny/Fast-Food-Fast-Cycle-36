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
        // console.log(user)
        if (user.rows.length < 1) {
          const message = 'This user does not exists';
          sendResponse.sendResponse(res, 401, message, false, null);
          // res.status(401).json({
          //   status: false,
          //   data: {
          //     message: 'This user does not exist',
          //     token: null,
          //   },
          // });
        } else if (!bcrypt.compareSync(password, user.rows[0].hashpassword)) {
          res.status(401).json({
            status: false,
            data: {
              message: 'you have entered invalid credentials. please try again',
              token: null,
            },
          });
        } else {
          const userId = user.rows[0].user_id;
          const token = jwt.sign({ id: userId }, config.tokenSecret, {
            expiresIn: 864456700,
          });
          return res.status(201).json({
            status: true,
            data: {
              message: 'You have logged in successfully',
              token,
            },
          });
        }
        return null;
      })
      .catch((err) => {
        console.log(err);
        res.status(501).json({
          status: false,
          data: {
            messsage: 'The server encountered a problem',
            token: null,
            err,
          },
        });
      });
    return null;
  }
}

export default signin;
