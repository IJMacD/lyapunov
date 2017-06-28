import React, {Component } from 'react';

export default class Output extends Component {
  componentDidMount() {
    this.doImperitiveStuff();
  }

  componentDidUpdate() {
    this.doImperitiveStuff();
  }

  doImperitiveStuff () {
    const { config, width, height } = this.props;

    if (this.canvas) {
      const ctx = this.canvas.getContext('2d');

      ctx.clearRect(0, 0, width, height);

      ctx.fillText("XMin: "       + config.xmin,        5, 15);
      ctx.fillText("XMax: "       + config.xmax,        5, 25);
      ctx.fillText("YMin: "       + config.ymin,        5, 35);
      ctx.fillText("YMax: "       + config.ymax,        5, 45);
      ctx.fillText("Pattern: "    + config.pattern,     5, 55);
      ctx.fillText("Iterations: " + config.iterations,  5, 65);
    }
  }

  render() {
    const { config, width, height } = this.props;

    return (
      <canvas width={width} height={height} ref={r => this.canvas = r} />
    );
  }
}
