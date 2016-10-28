import React from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import NavBar from './components/NavBar';

ReactDOM.render(<MuiThemeProvider>
    <NavBar />
  </MuiThemeProvider>, document.getElementById('content'));
