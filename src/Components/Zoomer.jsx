import React, { Component } from 'react';

export default class Zoomer extends Component {
  constructor () {
    super();

    this.state = {
      selection: null,
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  handleMouseDown (e) {
    this.setState({
      selection: {
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
        w: 0,
        h: 0,
      }
    });
  }

  handleMouseMove (e) {
    const { selection } = this.state;

    if (selection) {
      const pageX = e.pageX;
      const pageY = e.pageY;
      const targetBounds = e.currentTarget.getBoundingClientRect();
      const offsetX = pageX - targetBounds.left;
      const offsetY = pageY - targetBounds.top;

      const x = Math.min(selection.x, offsetX);
      const y = Math.min(selection.y, offsetY);
      const x2 = Math.max(selection.x, offsetX);
      const y2 = Math.max(selection.y, offsetY);

      this.setState({
        selection: {
          x,
          y,
          w: x2 - x,
          h: y2 - y,
        }
      });
    }
  }

  handleMouseUp (e) {
    this.setState({ selection: null });
  }

  render() {
    const { onChange, style, children, ...otherProps } = this.props;
    const { selection } = this.state;

    const innerStyle = {
      border: "2px dashed rgba(0,0,0,0.6)",
      display: selection ? "" : "none",
      position: "absolute",
      left: selection && selection.x,
      top: selection && selection.y,
      width: selection && selection.w,
      height: selection && selection.h,
    };

    return (
      <div
        style={{...style, position: "relative"}}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        { ...otherProps }
      >
        { children }
        <div style={innerStyle}></div>
      </div>
    );
  }
}
