import React, { Component } from 'react';

import Controls from '../../Components/Controls';
import ThemeControls from '../../Components/ThemeControls';
import Output from '../../Components/Output';
import ProgressiveOutput from '../../Components/ProgressiveOutput';
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
    const theme = {
      stable: "yellow",
      chaos: "blue"
    };

    return (
      <div className="container">
        <h1 className={classes.welcome}>
          Lyapunov
        </h1>
        <Controls config={config} onChange={this.handleConfigChange} />
        <ThemeControls theme={theme} />
        <ProgressiveOutput config={config} theme={theme} width={256} height={256} style={{width:256,height:256}} />
        <DebugOutput config={config} width={256} height={256} />
      </div>
    );
  }
}
