const express = require('express');
const path = require('path');
const _ = require('lodash');

function createApp() {
  const app = express();
  return app;
}

function setupStaticRoutes(app) {
  app.use(express.static(__dirname + '/public'));
  return app;
}

function setupMiddlewares(app) {
  app.use(require('cookie-parser')());
}

function setupRestRoutes(app) {
  app.use('/api/v1', require(path.join(__dirname, 'api')));
  return app;
}

module.exports = function(inputApp, inputOptions) {
  const app = inputApp || createApp();
  const options = inputOptions || {};

  _.defaults(options, { static: true, rest: true });

  if(options.static) {
    setupStaticRoutes(app);
  }

  if(options.rest) {
    setupMiddlewares(app);
    setupRestRoutes(app);
  }

  return app;
};
