'use strict';
const TABLE = 'auth';
const auth = require('../../../auth');
const bcrypt = require('bcrypt');
const error = require('../../../utils/error');
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
      return auth.sign({ ...userData });
    } else {
      throw error('Verify your information', 401);
    }
  }

  /**
   * Receives the user information such as username, password and creates a new record
   * @param data
   * @type {Object}
   */
  async function insert(data) {
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
        throw error('Error saving password', 500);
      }
    }
    return store.insert(TABLE, authData);
  }

  async function update(data) {
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
        throw error('Error saving password', 500);
      }
    }

    return store.update(TABLE, authData);
  }

  return {
    insert,
    login,
    update,
  };
};
