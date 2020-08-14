'use strict';
const TABLE = 'auth';
const auth = require('../../../auth');
const bcrypt = require('bcrypt');
module.exports = function (storeDependency) {
  const store = !storeDependency
    ? require('../../../store/dummy')
    : storeDependency;

  async function login(username, password) {
    // Verify if the user exists in the db
    const userData = await store.query(TABLE, { username: username });
    //  Verify password
    const passwordMatch = await bcrypt.compare(password, userData.password);
    if (passwordMatch) {
      // Return jwt token
      return auth.sign(userData);
    } else {
      throw new Error('Verify your information');
    }
  }

  /**
   * Receives the user information such as username, password and creates a new record
   * @param data
   * @type {Object}
   */
  async function upsert(data) {
    const authData = {
      id: data.id,
    };

    if (data.username) {
      authData.username = data.username;
    }

    if (data.password) {
      try {
        authData.password = await bcrypt.hash(data.password, 5);
      } catch (e) {
        throw new Error('Error saving password');
      }
    }
    return store.upsert(TABLE, authData);
  }

  return {
    upsert,
    login,
  };
};
