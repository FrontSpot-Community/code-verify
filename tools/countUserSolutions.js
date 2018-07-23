import mongoose from 'mongoose';
import config from '../app/configuration';
import solution from '../app/models/solution';
import user from '../app/models/user';

mongoose.connect(config.get('db:connection'));
mongoose.Promise = Promise;

mongoose.connection.once('open', function() {
  solution.find({}).then(async (solutions) => {
    const usersScores = {};
    solutions.forEach((data) => {
      if (data.completed) {
        if (usersScores.hasOwnProperty(data.userId)) {
          usersScores[data.userId]++;
        } else {
          usersScores[data.userId] = 1;
        }
      }
    });

    const entries = Object.entries(usersScores);
    for (let [_id, score] of entries) {
      await user.findOneAndUpdate(
        {_id},
        {score},
        {new: true}
      );
    }
    await mongoose.connection.close();
    process.exit();
  });
});
