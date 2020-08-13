const { nanoid } = require('nanoid');
const auth = require('../auth');
/**
 * This is a controller to handle requests and is injected with the store function to use, and
 * now it is easy to test
 * @param {function} storeDependency
 * @exports {Promise} methods
 */
const TABLE = 'users';
module.exports = function (storeDependency) {
  const store = !storeDependency ? require('../../../store/dummy') : storeDependency

  const list = () => store.list(TABLE);

  const get = id => store.get(TABLE, id);

  const upsert = async (data) => {
    const user = {
      name: data.name,
      username: data.username
    };

    if (data.id) {
      user.id = data.id;
    } else {
      user.id = nanoid();
    }

    // Creates a new record in auth table
    if (data.password || data.username) {
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: data.password,
      });
    }
    return store.upsert(TABLE, user); 
  };

  const remove = id => store.remove(TABLE, id);

  return {
    list,
    get,
    remove,
    insert: upsert,
  };
}
