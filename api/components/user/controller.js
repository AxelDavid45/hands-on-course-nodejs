/**
 * This is a controller to handle requests and is injected with the store function to use, and
 * now it is easy to test
 * @param {function} storeDependency
 * @exports {Promise} methods
 */
module.exports = function (storeDependency) {
  const TABLE = 'users'
  const store = !storeDependency ? require('../../../store/dummy') : storeDependency

  const list = () => store.list(TABLE)
  const get = id => store.get(TABLE, id)
  const insert = data => {
    const user = data;
    if (!user.name || !user.email || !user.password)
      throw new Error('Missing fields in the body request');

    return store.upsert(TABLE, data);
  };

  const remove = id => store.remove(TABLE, id);

  return {
    list,
    get,
    remove,
    insert,
  };
}
