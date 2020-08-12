const store = require('../../../store/dummy');
const TABLE = 'users';

const list = () => store.list(TABLE);

module.exports = {
  list
};
