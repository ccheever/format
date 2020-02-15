let Entity = require('./Entity');

async function createUser(props) {
  return await Entity.createEntity('user', props, 'u', 'userId', props.username);
}

module.exports = {
  createUser,
};
