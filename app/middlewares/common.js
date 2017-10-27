/* eslint-disable no-console */
import config from '../configuration';

export function listen(err) {
    return err
        ? console.log(err)
        : console.log(`Server is running on port:${config.get('port')}`);
}

export function errorHandler(err, req, res, next) {
    return res.status(err.status ? err.status : 500).json(err);
}
