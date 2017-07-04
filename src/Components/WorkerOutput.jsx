import React, {Component } from 'react';

import ProgressiveOutput from './ProgressiveOutput';

const StripWidth = 32;

export default class WorkerOutput extends ProgressiveOutput {

  constructor () {
    super();

    this.jobID = 0;
  }

  componentDidMount() {
    this.worker = new Worker('./worker.js');
    this.worker.addEventListener("message", e => {
      const { width, height } = this.props;
      const { startX, data, jobID } = e.data;
      const array = new Float32Array(data);
      const endX = startX + array.length / height;

      if (jobID === this.jobID) {
        this.renderStrip(startX, endX, array);

        if (endX < width) {
          this.setState({ startX: endX });
        }
      }
    });

    this.doImperitiveStuff();
  }

  componentWillUnmount() {
    this.worker.terminate();
  }

  doImperitiveStuff () {
    const { config, width, height } = this.props;
    const { startX } = this.state;
    const endX = startX + StripWidth;

    this.jobID++;

    this.worker.postMessage({ config, startX, endX, width, height, jobID: this.jobID });
  }

  renderStrip(startX, endX, data) {
    const { height, theme } = this.props;

    if (this.canvas) {
      const ctx = this.canvas.getContext('2d');

      for(let currX = startX; currX < endX; currX++) {
        for(let currY = 0; currY < height; currY++) {

          let pix;
          const value = data[(currX - startX) * height + currY];

          if (value > 0)
          {
            // CHAOS!!!
            //Debugger.Log(0, "", "CHAOS\n");
            let colorIntensity = 255 - Math.floor(Math.exp(-value) * 255);
            pix = colorFromIntensity(colorIntensity, theme.chaos);
          }

          // STABILITY
          else if (!isFinite(value))
          {
              //Debugger.Log(0, "", "-INF\n");
              pix = "rgb(255,255,255)";
          }
          else if (isNaN(value))
          {
              //Debugger.Log(0, "", "NaN\n");
              pix = "rgb(255,255,255)";
          }
          else
          {
              //Debugger.Log(0, "", "OK\n");
              let colorIntensity = Math.floor(Math.exp(value) * 255);
              pix = colorFromIntensity(colorIntensity, theme.stable)
          }
          ctx.fillStyle = pix;
          ctx.fillRect(currX, height - currY - 1, 1, 1);
        }
      }
    }
  }

  render() {
    const { config, width, height, theme, ...otherProps } = this.props;

    return (
      <canvas width={width} height={height} ref={r => this.canvas = r} {...otherProps} />
    );
  }
}

function colorFromIntensity (intensity, color) {
  switch (color)
  {
    case "yellow":
      return `rgb(${intensity},${Math.floor(intensity * 0.85)},0)`;
    case "red":
      return `rgb(${intensity},0,0)`;
    case "green":
      return `rgb(0,${intensity},0)`;
    case "blue":
      return `rgb(0,0,${intensity})`;
    case "lightblue":
      return `rgb(0,${Math.floor(intensity * 0.75)},${intensity})`;
    case "cyan":
      return `rgb(0,${intensity},${intensity})`;
    case "magenta":
      return `rgb(${intensity},0,${Math.floor(intensity * 0.85)})`;
    case "pink":
      return `rgb(${intensity},${Math.floor(intensity * 0.5)},${Math.floor(intensity * 0.85)})`;
    case "orange":
      return `rgb(${intensity},${Math.floor(intensity * 0.4)},0)`;
    case "black":
      return `rgb(${255 - intensity},${255 - intensity},${255 - intensity})`;
    case "white":
    default:
      return `rgb(${intensity},${intensity},${intensity})`;
  }
}

