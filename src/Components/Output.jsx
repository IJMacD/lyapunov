import React, {Component } from 'react';

const InitX = 0.5;

export default class Output extends Component {
  componentDidMount() {
    this.doImperitiveStuff();
  }

  componentDidUpdate() {
    this.doImperitiveStuff();
  }

  doImperitiveStuff () {
    const { width } = this.props;
    this.renderStrip(0, width);
  }

  renderStrip(startX, endX) {
    const { config, theme, width, height } = this.props;

    if (this.canvas) {
      const ctx = this.canvas.getContext('2d');

      for(let currX = startX; currX < endX; currX++) {
        for(let currY = 0; currY < height; currY++) {

          let a = ((config.ymax - config.ymin) / height) * (currY + InitX) + config.ymin;
          let b = ((config.xmax - config.xmin) /  width) * (currX + InitX) + config.xmin;
          let x = InitX;
          //Debugger.Log(0, "", "currY: " + currY.ToString() + " a: " + a.ToString() + " b: " + b.ToString() + "\n");

          let r = 0;
          for (let i = 0; i < config.pattern.length; i++)
          {
              //r = _config.Pattern[i] ? a : b;
              switch (config.pattern[i])
              {
                  case 'a':
                      r = a;
                      break;
                  case 'b':
                      r = b;
                      break;
              }
              x *= r * (1 - x);

          }

          let  sum_of_log_of_derived = 0;
          for (let n = 0; n < config.iterations; n++)
          {
              let  derived = 1;
              for (let m = 0; m < config.pattern.length; m++)
              {
                  //r = _config.Pattern[m] ? a : b;
                  switch (config.pattern[m])
                  {
                      case 'a':
                          r = a;
                          break;
                      case 'b':
                          r = b;
                          break;
                  }
                  x *= r * (1 - x);
                  derived *= r * (1 - 2 * x);
                  //if (derived < 0) Debugger.Log(0, "", "< 0");
              }
              let  log_of_derived = Math.log(Math.abs(derived));
              sum_of_log_of_derived += log_of_derived;

              if (!isFinite(derived)) break;
              //|| log_of_derived > 5.541263545158425) break;
              //if (n >= 50 && log_of_derived * n == sum_of_log_of_derived) break;
          }


          let value = sum_of_log_of_derived / (config.iterations + config.pattern.length);

          let pix;

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
