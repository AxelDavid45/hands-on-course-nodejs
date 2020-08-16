'use strict';
const auth = require('../../../auth');
module.exports = function checkAuth(action) {
  function authMiddleware(req, res, next) {
    switch (action) {
      case 'update':
        auth.check.own(req, req.body.id);
        next();
        break;
      case 'follow':
        auth.check.logged(req);
        next();
        break;
      default:
        next();
    }
  }

  return authMiddleware;
};
