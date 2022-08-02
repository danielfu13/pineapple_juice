const db = require('../config/connection');
const { User, Exercise } = require('../models');
const userSeeds = require('./userSeeds.json');
const exerciseSeeds = require('./exerciseSeeds.json');

db.once('open', async () => {
  try {
    await Exercise.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < exerciseSeeds.length; i++) {
      const { _id, exerciseUser } = await Exercise.create(exerciseSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: exerciseUser },
        {
          $addToSet: {
            exercises: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
