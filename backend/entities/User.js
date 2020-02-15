let Entity = require('../Entity');

async function createUser(vctx, props) {
  // Anyone can create a user
  return await Entity.createRow('user', props, 'u', 'userId', props.username);
}

async function updateUser(vctx, userId, props) {
  Entity.assertIsUser(vctx, userId);

  // No one can change the userId
  if (props.userId && props.userId !== userId) {
    throw new Entity.UnauthorizedError("Can't change userId");
  }

  return await Entity.updateRow('user', userId, props, 'userId');
}

async function retrieveUser(vctx, userId) {
  // Anyone can get any user (for now)
  return await Entity.retrieveRow('user', userId);
}

module.exports = {
  createUser,
  updateUser,
  retrieveUser,
};
