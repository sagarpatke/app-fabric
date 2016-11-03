const Router = require('express').Router();

Router.get('/ping', function(req, res) {
  res.send('PONG');
});

Router.use('/auth', require('./auth'));
Router.use('/repos', require('./repos'));
Router.use('/repo', require('./repos'));

module.exports = Router;
