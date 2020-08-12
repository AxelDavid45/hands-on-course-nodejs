/**
 * This is a controller to handle requests and is injected with the store function to use, and
 * now it is easy to test
 * * @param {function} storeDependency
 */
module.exports = function (storeDependency) {
  const TABLE = 'users'
  const store = !storeDependency ? require('../../../store/dummy') : storeDependency

  const list = () => store.list(TABLE);

  return {
    list
  };
}
