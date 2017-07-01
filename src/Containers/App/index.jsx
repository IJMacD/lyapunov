import React, { Component } from 'react';

import Controls from '../../Components/Controls';
import SizeControls from '../../Components/SizeControls';
import ThemeControls from '../../Components/ThemeControls';
import Output from '../../Components/Output';
import ProgressiveOutput from '../../Components/ProgressiveOutput';
import Zoomer from '../../Components/Zoomer';
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
      size: {
        width: 256,
        height: 256,
      },
    };

    this.handleConfigChange = this.handleConfigChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleThemeChange = this.handleThemeChange.bind(this);
  }

  handleConfigChange (config) {
    this.setState({ config });
  }

  handleThemeChange (theme) {
    this.setState({ theme });
  }

  handleSizeChange (size) {
    this.setState({ size });
  }

  render () {
    const { config, theme, size } = this.state;

    return (
      <div className="container">
        <h1 className={classes.welcome}>
          Lyapunov
        </h1>
        <div className="row">
          <Controls config={config} onChange={this.handleConfigChange} className="col-sm-6" />
          <SizeControls size={size} onChange={this.handleSizeChange} className="col-sm-3" />
          <ThemeControls theme={theme} onChange={this.handleThemeChange} className="col-sm-3" />
        </div>
        <Zoomer>
          <ProgressiveOutput
            config={config}
            theme={theme}
            width={size.width}
            height={size.height}
            style={{
              width: size.width,
              height: size.height,
              maxWidth: "100%",
            }}
          />
        </Zoomer>
      </div>
    );
  }
}
