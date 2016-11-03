import React from 'react';

import Paper from 'material-ui/Paper';

import SelectRepositoryMaterial from './SelectRepositoryMaterial';

const styles = {
  paper: {
    padding: '50px'
  }
}

export default class DeployBot extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-offset-2 col-lg-8">
            <Paper
              zDepth={3}
              style={styles.paper} >
              <SelectRepositoryMaterial />
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}
