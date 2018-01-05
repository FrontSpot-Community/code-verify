import {createError} from '../libs/common';

const checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated() || req.path.includes('/auth/github')) {
    return next();
  } else {
    return next(createError('Unauthorized', 401));
  }
};

export default checkAuthentication;
