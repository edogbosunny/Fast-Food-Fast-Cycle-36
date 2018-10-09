import jwt from 'jsonwebtoken';
import db from '../config/db';
import config from '../config/default';

class Admin {
  static seedAdmin(req, res) {
    let token;
    let userId;
    const email = 'admin@admin.com';
    const hashPassword = '$2y$12$5r0xbtBNJjDyCJzEJ0uARuWMnvPOvedJkgZYHL77tH9aRwg6kZFe2';
    const firstName = 'admin';
    const lastName = 'admin';
    const userRole = 'admin';

    const userQuery = 'SELECT * FROM users WHERE email = $1';
    // checck to see if email exists

    db.query(userQuery, [email])
      .then((userExist) => {
        if (userExist.rowCount > 0) {
          return res.status(400).json({
            status: true,
            data: {
              message: 'User already exists in the database',
              token,
            },
          });
        }
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
  }
}

export default Admin;
