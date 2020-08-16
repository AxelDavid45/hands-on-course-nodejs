'use strict';
/**
 * This is a controller to handle requests and is injected with the store function to use, and
 * now it is easy to test
 * @param {function} storeDependency
 * @exports {Promise} methods
 */
const TABLE = 'posts';
module.exports = function (storeDependency) {
  const store = !storeDependency
    ? require('../../../store/dummy')
    : storeDependency;

  function list() {
    return store.list(TABLE);
  }

  return {
    list,
  };
};
