import {createError} from '../libs/common';
import {verifyToken} from '../libs/jwt';
import httpStatuses from '../constants/httpStatuses';

const checkAuthentication = async (req, res, next) => {
  const {unauthorized} = httpStatuses;
  try {
    const token = req.cookies.token;
    const decodedToken = token && await verifyToken(token);
    if (decodedToken || req.path.includes('/auth/github')) {
      req.user = decodedToken;
      return next();
    } else {
      return next(createError(unauthorized.message, unauthorized.statusCode));
    }
  } catch (error) {
      return next(error);
  }
};

export default checkAuthentication;
