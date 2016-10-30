import React from 'react';
import request from 'superagent';

const styles = {
  login: {
    textAlign: 'center'
  }
};

export default class LoginView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    request
      .get('/api/v1/auth/github/url')
      .end(function(err, res) {
        this.setState({githubLoginUrl: res.text});
      }.bind(this));
  }

  render() {
    return (
      <div style={styles.login}>
        <p>Login to continue</p>
        <a href={this.state.githubLoginUrl}><img
          src="https://assets-cdn.github.com/images/modules/logos_page/GitHub-Logo.png"
          width="100" /></a>
      </div>
    );
  }
}
