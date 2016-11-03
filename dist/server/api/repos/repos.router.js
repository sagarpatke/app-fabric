const Router = require('express').Router();
const controller = require('./repos.controller');
const authMiddleware = require('../auth/middleware');

Router.get('/', authMiddleware, controller.repos);
Router.get('/:owner/:reponame/branches', authMiddleware, controller.branches);

module.exports = Router;
