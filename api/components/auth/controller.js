'use strict';
const TABLE = 'auth';
module.exports = function (storeDependency) {
  const store = !storeDependency
    ? require('../../../store/dummy')
    : storeDependency;

  async function login(username, password) {
    // Verify if the user exists in the db
    const userData = await store.query(TABLE, { username: username });
    //  Verify password
    if (userData.password === password) {
      // Return jwt token
      return 'TOKEN';
    } else {
      throw new Error('Verify your information');
    }
  }

  /**
   * Receives the user information such as username, password and creates a new record
   * @param data
   * @type {Object}
   */
  function upsert(data) {
    const authData = {
      id: data.id,
    };

    if (data.username) {
      authData.username = data.username;
    }

    if (data.password) {
      authData.password = data.password;
    }

    return store.upsert(TABLE, authData);
  }

  return {
    upsert,
    login,
  };
};
