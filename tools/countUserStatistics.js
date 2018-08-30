import mongoose from 'mongoose';
import config from '../app/configuration';
import Solution from '../app/models/solution';
import User from '../app/models/user';

mongoose.connect(config.get('db:connection'));
mongoose.Promise = Promise;

mongoose.connection.once('open', async () => {
  User.find({})
  .then(async (users) =>
    await Promise.all(users.map((user) =>
      User.update({_id: user._id}, {
        '$unset': {score: ''},
        '$set': {
          statistics: {
            tasks: {
              solved: 0,
              trained: 0,
              attempts: 0
            },
            totalScore: 0
          }
        }
      })
    ))
  )
  .then(() => Solution.find({}))
  .then(async (solutions) => {
    const userStatistics = solutions.reduce((acc, solution) => {
      const solved =
        acc[solution.userId] ? acc[solution.userId].tasks.solved : 0;
      const trained =
        acc[solution.userId] ? acc[solution.userId].tasks.trained : 0;
      const attempts =
        acc[solution.userId] ? acc[solution.userId].tasks.attempts : 0;
      return {
        ...acc,
        [solution.userId]: {
          tasks: {
            solved: solution.completed ? solved + 1 : solved,
            trained: trained + 1,
            attempts: attempts + 1
          },
          totalScore: solution.completed ? solved + 1 : solved
        }
      };
    }, {});

    await Promise.all(Object.entries(userStatistics).map(([_id, statistics]) =>
      User.findOneAndUpdate(
        {_id},
        {statistics},
        {new: true}
      )));
  })
  .then(async () => {
    await mongoose.connection.close();
    process.exit();
  });
});
