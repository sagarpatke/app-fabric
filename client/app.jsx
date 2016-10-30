import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import cookie from 'react-cookie';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import LoginView from './views/LoginView';
import DashboardView from './views/DashboardView';

function redirectIfLoggedIn(nextState, replace, next) {
  const token = cookie.load('token');
  if(token) { replace('/dashboard'); }
  next();
}

function redirectIfNotLoggedIn(nextState, replace, next) {
  const token = cookie.load('token');
  if(!token) { replace('/'); }
  next();
}

ReactDOM.render(<MuiThemeProvider>
    <Router history={hashHistory}>
      <Route path="/" component={LoginView} onEnter={redirectIfLoggedIn}/>
      <Route path="/dashboard" component={DashboardView} onEnter={redirectIfNotLoggedIn}/>
    </Router>
  </MuiThemeProvider>, document.getElementById('content'));
