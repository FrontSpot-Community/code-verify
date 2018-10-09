import Task from '../models/task';
import Tournament from '../models/tournament';
import mongoose from 'mongoose';
import * as commonCrudOperations from '../libs/commonCrudOperations';

export const getAll = commonCrudOperations.getAll(Task);

export const getById = commonCrudOperations.getById(Task, 'id');

export const add = async (req, res, next) => {
    try {
        const newTask = await new Task(req.body).save();
        const updatedTournament = await Tournament.findOneAndUpdate(
            {id: req.body.tournamentId},
            {$push: {taskIds: newTask._id}},
            {new: true}
        );
        return res.json(updatedTournament);
    } catch (exception) {
        next(exception);
    }
};

export const remove = async (req, res, next) => {
    try {
        const removedTask = await Task.findOneAndRemove({id: req.params.id});
        const updatedTournament = await Tournament.findOneAndUpdate(
            {taskIds: removedTask._id},
            {$pull: {taskIds: new mongoose.Types.ObjectId(removedTask._id)}}
            );
        res.json(updatedTournament);
    } catch (exception) {
        next(exception);
    }
};

export const update = commonCrudOperations.update(Task);
