import {pick} from 'lodash';

export const getAll = (Model) => {
    return (req, res, next) => {
        return Model
            .findAndCount()
            .then((data) => res.json(data))
            .catch(next);
    };
};

export const getById = (Model) => {
    return (req, res, next) => {
        return req.query.populateField
            ? Model.findOne({id: req.params.id})
                .populate(req.query.populateField)
                .exec()
                .then((data) => res.json(data))
                .catch(next)
            : Model.findOne({id: req.params.id})
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
