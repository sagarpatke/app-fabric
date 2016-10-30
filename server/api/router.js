const Router = require('express').Router();

Router.get('/ping', function(req, res) {
  res.send('PONG');
});

Router.use('/auth', require('./auth'));

module.exports = Router;
