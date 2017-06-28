import React, { Component } from 'react';

import Controls from '../../Components/Controls';
import Output from '../../Components/Output';
import DebugOutput from '../../Components/DebugOutput';

import classes from './style.cssm';

export default class App extends Component {
  constructor () {
    super();

    this.state = {
      config: {
        xmin: 2,
        xmax: 4,
        ymin: 2,
        ymax: 4,
        pattern: "ab",
        iterations: 100,
      },
    };

    this.handleConfigChange = this.handleConfigChange.bind(this);
  }

  handleConfigChange (config) {
    this.setState({ config });
  }

  render () {
    const { config } = this.state;

    return (
      <div className="container">
        <h1 className={classes.welcome}>
          Lyapunov
        </h1>
        <Controls config={config} onChange={this.handleConfigChange} />
        <Output config={config} width={256} height={256} />
        <DebugOutput config={config} width={256} height={256} />
      </div>
    );
  }
}
