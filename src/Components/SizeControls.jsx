import React, { Component } from 'react';

export default class SizeControls extends Component {
  constructor () {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (key) {
    return (e) => {
      const { size, onChange } = this.props;

      onChange({
        ...size,
        [key]: parseInt(e.target.value),
      });
    };
  }

  render() {
    const { size, onChange, ...otherProps } = this.props;

    return (
      <div { ...otherProps }>
        <div className="row">
          <label className="col-sm-6 col-form-label">Width</label>
          <input type="number" id="width" value={size.width} onChange={this.handleChange("width")} size="4" placeholder="Width" className="form-control col-sm-6" />
        </div>
        <div className="row">
          <label className="col-sm-6 col-form-label">Height</label>
          <input type="number" id="height" value={size.height} onChange={this.handleChange("height")} size="4" placeholder="Height" className="form-control col-sm-6" />
        </div>
      </div>
    );
  }
}
