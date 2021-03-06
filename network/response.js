'use strict';
exports.success = function (req, res, message = 'ok', status = 200) {
  res.status(status).send({
    status: status,
    body: message,
  });
};

exports.error = function (
  req,
  res,
  message = 'Internal Server Error',
  status = 500
) {
  res.status(status).send({
    error: true,
    status: status,
    body: message,
  });
};
