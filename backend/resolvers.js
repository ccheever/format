let User = require('./entities/User');

module.exports = {
  Query: {
    answerToLife: (_, {}, context, info) => {
      return 42;
    },
    user: async (_, { userId }, context, info) => {
      return await User.retrieveUser(context, userId);
    },
  },

};
