import pick from '../libs/pick';

export const getAll = (
  Model,
  filter = {},
  skipLimit = null,
  sortSettings = null
) => {
  return (req, res, next) => {
    return Model
      .findAndCount(filter, skipLimit, sortSettings)
      .then((data) => res.json(data))
      .catch(next);
  };
};

export const getById = (Model, findBy) => {
  return (req, res, next) => {
    const selector = getSelector(req, findBy);
    const findSuccess = (data) => {
      return data
        ? res.json(data)
        : Promise.reject({status: 404, message: 'Not Found'});
    };

    return req.query.populateField
      ? Model
        .findOne(selector)
        .populate(req.query.populateField)
        .exec()
        .then(findSuccess)
        .catch(next)
      : Model
        .findOne(selector)
        .then(findSuccess)
        .catch(next);
  };
};

export const removeById = (Model, findBy) => {
  return (req, res, next) => {
    const selector = getSelector(req, findBy);
    return Model
      .findOneAndRemove(selector)
      .then((data) => res.json(data))
      .catch(next);
  };
};

export const add = (Model) => {
  return (req, res, next) => {
    const objectToInsert = pick(req.body, Object.keys(req.body));
    return new Model(objectToInsert)
      .save()
      .then((data) => res.json(data))
      .catch(next);
  };
};

export const update = (Model) => {
  return (req, res, next) => {
    const condition = {_id: req.params.id};
    const updatedDocument = pick(req.body, Object.keys(req.body));
    const options = {new: true};

    return Model
      .findOneAndUpdate(condition, updatedDocument, options)
      .then((data) => res.json(data))
      .catch(next);
  };
};

const getSelector = (req, param) => {
  return param
  ? {[param]: req.params.id || req.user._id}
  : {_id: req.params.id || req.user._id};
};
