module.exports = function (storeDependency) {
  const TABLE = 'users'
  const store = !storeDependency ? require('../../../store/dummy') : storeDependency;
};
