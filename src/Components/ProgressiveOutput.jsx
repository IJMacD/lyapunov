import React, {Component } from 'react';

import Output from './Output';

const InitX = 0.5;
const StripWidth = 32;

export default class ProgressiveOutput extends Output {
  constructor () {
    super();

    this.state = {
      startX: 0,
    };
  }

  componentDidUpdate(prevProps) {
    if (propsChanged(prevProps, this.props)) {
      this.setState({ startX: 0 });
    }

    this.doImperitiveStuff();
  }

  doImperitiveStuff () {
    const { width } = this.props;
    const { startX } = this.state;
    const endX = startX + StripWidth;

    if (startX < width) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.renderStrip(startX, endX);
        this.setState({ startX: endX })
      }, 0);
    }
  }
}

function propsChanged (prevProps, nextProps) {
  for(let key in prevProps) {
    if(prevProps[key] !== nextProps[key]) {
      return true;
    }
  }
  // Misses any new keys in nextProps
  return false;
}
