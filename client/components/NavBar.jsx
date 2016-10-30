import React from 'react';
import cookie from 'react-cookie';
import request from 'superagent';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import Avatar from 'material-ui/Avatar';

const styles = {
  drawer: {
    textAlign: 'center'
  },
  avatar: {
    marginTop: '13px'
  }
};

export default class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      drawerOpen: false
    };
  }

  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }

  componentDidMount() {
    const setUserInState = () => {
      this.setState({
        user: JSON.parse(localStorage.user)
      });
    };

    if(!localStorage.user) {
      request
        .get('/api/v1/auth/github/me')
        .end(function(err, response) {
          if(err) { throw err; }
          localStorage.user = JSON.stringify(response.body);
          setUserInState();
        });
    } else {
      setUserInState();
    }
  }

  handleLogout() {
    delete localStorage.user;
    cookie.remove('token');
    this.context.router.push('/');
  }

  render() {
    return (
      <div>
        <AppBar
          title="ReactJS Boilerplate"
          onLeftIconButtonTouchTap={() => { this.setState({drawerOpen: true}); }}
        />
        <Drawer
          open={this.state.drawerOpen}
          docked={false}
          onRequestChange={() => { this.setState({drawerOpen: false}); }}
          style={styles.drawer} >
            { this.state.user ?
              <Avatar src={this.state.user.avatar_url} size={230} style={styles.avatar}/> :
              null }
            <MenuItem
              leftIcon={<ActionExitToApp />}
              onTouchTap={this.handleLogout.bind(this)}>
              Logout
            </MenuItem>
        </Drawer>
      </div>
    );
  }
}
