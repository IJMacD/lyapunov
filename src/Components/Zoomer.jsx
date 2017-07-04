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
        x1: e.nativeEvent.offsetX,
        y1: e.nativeEvent.offsetY,
        x2: e.nativeEvent.offsetX,
        y2: e.nativeEvent.offsetY,
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

      this.setState({
        selection: {
          ...selection,
          x2: offsetX,
          y2: offsetY,
        }
      });
    }
  }

  handleMouseUp (e) {
    const { onZoom } = this.props;
    const { selection } = this.state;

    const x = selection && Math.min(selection.x1, selection.x2);
    const y = selection && Math.min(selection.y1, selection.y2);
    const x2 = selection && Math.max(selection.x1, selection.x2);
    const y2 = selection && Math.max(selection.y1, selection.y2);

    if(x !== x2 && y !== y2) {
      onZoom({
        x,
        y,
        w: x2 - x,
        h: y2 - y,
      });
    }
    this.setState({ selection: null });
  }

  render() {
    const { onChange, style, children, onZoom, ...otherProps } = this.props;
    const { selection } = this.state;

    const x1 = selection && Math.min(selection.x1, selection.x2);
    const y1 = selection && Math.min(selection.y1, selection.y2);
    const x2 = selection && Math.max(selection.x1, selection.x2);
    const y2 = selection && Math.max(selection.y1, selection.y2);

    const innerStyle = {
      border: "2px dashed rgba(0,0,0,0.6)",
      display: selection ? "" : "none",
      position: "absolute",
      left: x1,
      top: y1,
      width: (x2 - x1),
      height: (y2 - y1),
    };

    return (
      <div
        style={{...style, position: "relative", display: "inline-block"}}
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
