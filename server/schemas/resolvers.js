const { AuthenticationError } = require('apollo-server-express');
const { User, Exercise } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('exercises');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('exercises');
    },
    exercises: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Exercise.find(params).sort({ createdAt: -1 });
    },
    exercise: async (parent, { exerciseId }) => {
      return Exercise.findOne({ _id: exerciseId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('exercises');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addExercise: async (parent, { exerciseDesc }, context) => {
      if (context.user) {
        const exercise = await Exercise.create({
          exerciseDesc,
          exerciseUser: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { exercises: exercise._id } }
        );

        return exercise;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { exerciseId, commentText }, context) => {
      if (context.user) {
        return Exercise.findOneAndUpdate(
          { _id: exerciseId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeExercise: async (parent, { exerciseId }, context) => {
      if (context.user) {
        const exercise = await Exercise.findOneAndDelete({
          _id: exerciseId,
          exerciseUser: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { exercises: exercise._id } }
        );

        return exercise;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeComment: async (parent, { exerciseId, commentId }, context) => {
      if (context.user) {
        return Exercise.findOneAndUpdate(
          { _id: exerciseId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
