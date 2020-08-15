'use strict';
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
  const store = !storeDependency
    ? require('../../../store/dummy')
    : storeDependency;

  const list = () => store.list(TABLE);

  const get = (id) => store.get(TABLE, id);

  const insert = async (data) => {
    const user = {
      id: nanoid(),
      name: data.name,
      username: data.username,
    };
    // Creates a new record in auth table
    if (data.password || data.username) {
      await auth.insert({
        id: user.id,
        username: user.username,
        password: data.password,
      });
    }
    return store.insert(TABLE, user);
  };

  const update = async (data) => {
    const user = {
      id: data.id,
    };

    if (data.username) {
      user.username = data.username;
    }

    if (data.name) {
      user.name = data.name;
    }

    if (data.password || data.username) {
      await auth.update(user);
    }

    return store.update(TABLE, data);
  };

  const remove = (id) => store.remove(TABLE, id);

  return {
    list,
    get,
    remove,
    insert,
    update,
  };
};
