/* eslint-disable no-console */
import Tournament from '../models/tournament';
import Task from '../models/task';

import tasks from './tasks';

const insertTasks = (arrayOfTasks) => {
   const arrayOfPromises = arrayOfTasks.map((task) => new Task(task).save());

   const insertTournament = (insertedTasks) => {
       console.log('insertedTasks', insertedTasks);
       const tournament = {
           name: 'welcome tournament',
           description: 'First tournament',
           taskIds: [...insertedTasks.map((item) => item._id)]
       };

       return new Tournament(tournament)
           .save()
           .then((insertedTournament) => {
                console.log('insertedTournament', insertedTournament);
           });
   };

   Promise
       .all(arrayOfPromises)
       .then(insertTournament)
       .catch();
};
export default function() {
    insertTasks(tasks);
}

