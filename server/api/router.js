const Router = require('express').Router();

Router.get('/ping', function(req, res) {
  res.send('PONG');
});

module.exports = Router;
