import config from '../configuration';
import jwt from 'jsonwebtoken';

export const setToken = (res, token) => {
    res.setHeader('x-access-token', token);
};


export const getToken = (req) => {
    return req.headers['x-access-token'];
};

export const signToken = (data) => {
    try {
        return jwt.sign(
            data,
            config.get('key'),
            {expiresIn: config.get('expirationPeriod')}
        );
    } catch (error) {
        throw error;
    }
};

export const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        return jwt.verify(token, config.get('key'), (err, decoded) => {
            return err ? reject(err) : resolve(decoded);
        });
    });
};
