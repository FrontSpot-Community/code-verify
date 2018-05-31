import {createError} from '../libs/common';
import {verifyToken} from '../libs/jwt';


const checkAuthentication = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decodedToken = token && await verifyToken(token);
    if (decodedToken || req.path.includes('/auth/github')) {
      req.user = decodedToken;
      return next();
    } else {
      return next(createError('Unauthorized', 401));
    }
  } catch (error) {
      return next(createError('Unauthorized', 401));
  }
};

export default checkAuthentication;
