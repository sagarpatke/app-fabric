import React from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import NavBar from './components/NavBar';

ReactDOM.render(<MuiThemeProvider>
    <div>
      <NavBar />
      <small>This is the content area.</small>
    </div>
  </MuiThemeProvider>, document.getElementById('content'));
