import jwt from 'jsonwebtoken';
import config from '../config/default';

/* eslint-disable-next-line */
class isAuthenticated {
  static authenticationCheck(req, res, next) {
    const token = req.headers['x-access-token'];
    //    console.log('tok :', req.headers);
    if (!token) {
      return res.status(401).send({
        auth: false,
        token: null,
        message: 'No token provided.',
      });
    }

    jwt.verify(token, config.tokenSecret, (err, decoded) => {
      if (err) {
        // console.log(err);
        return res.status(401).json({ err });
      }
      if (decoded) {
        // console.log('dc=====>', decoded);
        req.app.set('userId', decoded.id); // controllers would need this
        next();
      } else {
        return res
          .status(402)
          .json({
            auth: false,
            token: null,
            message: 'Failed to authenticate token.',
          });
      }
      return null;
    });
    return null;
  }
}

export default isAuthenticated;
