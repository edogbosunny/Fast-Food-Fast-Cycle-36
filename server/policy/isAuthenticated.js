import jwt from 'jsonwebtoken';
import config from '../config/default';
import statusResponse from '../helpers/returnStatus';

/* eslint-disable-next-line */
class isAuthenticated {
  static authenticationCheck(req, res, next) {
    const token = req.headers['x-access-token'];
    //    console.log('tok :', req.headers);
    if (!token) {
      const message = 'No token provided.';
      return statusResponse.isAutenticationResponse(res, 401, false, message, token);
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
        const message = 'Failed to authenticate token.';
        return statusResponse.isAutenticationResponse(res, 402, false, message, token);
      }
      return null;
    });
    return null;
  }
}

export default isAuthenticated;
