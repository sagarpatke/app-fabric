import React from 'react';

import NavBar from '../components/NavBar';
import DeployBot from '../components/Deploy/DeployBot';

export default class DeployView extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <DeployBot />
      </div>
    );
  }
}
