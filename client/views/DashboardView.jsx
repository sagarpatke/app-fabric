import React from 'react';

import NavBar from '../components/NavBar';

export default class DashboardView extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <small>This is the Dashboard View</small>
      </div>
    );
  }
}
