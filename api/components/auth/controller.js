const TABLE = 'auth';
module.exports = function (storeDependency) {
  const store = !storeDependency ? require('../../../store/dummy') : storeDependency

  /**
   * Receives the user information such as username, password and creates a new record
   * @param data
   * @type {Object}
   */
  function upsert (data) {
    const authData = {
      id: data.id
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
  };
}
