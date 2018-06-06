import {createError} from '../libs/common';
import httpStatuses from '../constants/httpStatuses';


const checkAccess = (req, res, next) => {
    const {forbidden} = httpStatuses;

    return req.user.isAdmin
        ? next()
        : next(createError(forbidden.message, forbidden.statusCode));
};

export default checkAccess;
