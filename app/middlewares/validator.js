import Joi from 'joi';
import {createError} from '../libs/common';

const validatorOptions = {
  convert: true,
  allowUnknown: false,
  abortEarly: false
};

const types = ['params', 'body', 'query'];

function filterSchemaKeys(schema) {
  return types.reduce((acc, item) => {
    if (schema[item]) {
      acc[item] = schema[item];
    }

    return acc;
  }, {});
}

function filterResponseByScheme(res, schema) {
  return Object.keys(schema).reduce((acc, key) => {
    if (res[key]) {
      acc[key] = res[key];
    }

    return acc;
  }, {});
}

export default function(schema, opts = {}) {
  return function expressJoiValidator(req, res, next) {
    const filteredSchema = filterSchemaKeys(schema);
    const filteredReq = filterResponseByScheme(req, schema);

    const ret = Joi.validate(
      filteredReq,
      filteredSchema, opts || validatorOptions
    );

    if (!ret.error) {
      return next();
    }

    const errorMessage = ret.error && ret.error.details || 'Validation error';

    return next(createError(errorMessage, 400));
  };
}
