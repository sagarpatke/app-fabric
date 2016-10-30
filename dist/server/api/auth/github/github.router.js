const Router = require('express').Router();
const controller = require('./github.controller');

Router.get('/url', controller.url);
Router.get('/complete', controller.complete);
Router.get('/me', controller.me);

module.exports = Router;
