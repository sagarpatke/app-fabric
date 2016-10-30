const Router = require('express').Router();

Router.use('/github', require('./github'));

module.exports = Router;
