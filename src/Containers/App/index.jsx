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
      theme: {
        stable: "yellow",
        chaos: "blue"
      },
    };

    this.handleConfigChange = this.handleConfigChange.bind(this);
    this.handleThemeChange = this.handleThemeChange.bind(this);
  }

  handleConfigChange (config) {
    this.setState({ config });
  }

  handleThemeChange (theme) {
    this.setState({ theme });
  }

  render () {
    const { config, theme } = this.state;

    return (
      <div className="container">
        <h1 className={classes.welcome}>
          Lyapunov
        </h1>
        <div className="row">
          <Controls config={config} onChange={this.handleConfigChange} className="col-sm-6" />
          <ThemeControls theme={theme} onChange={this.handleThemeChange} className="col-sm-6" />
        </div>
        <ProgressiveOutput
          config={config}
          theme={theme}
          width={256}
          height={256}
          style={{
            width: 256,
            height: 256,
          }}
        />
      </div>
    );
  }
}
