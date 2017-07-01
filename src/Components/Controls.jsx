import React, {Component } from 'react';

export default class Controls extends Component {
  constructor () {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (e) {
    let { id, value } = e.target;
    const { config, onChange } = this.props;

    if (id !== "pattern") {
      value = parseFloat(value);
    }

    onChange({
      ...config,
      [id]: value,
    });
  }

  render() {
    const { config, onChange, ...otherProps } = this.props;

    return (
      <form { ...otherProps }>
        <div className="row">
          <p className="offset-sm-2 col-sm-2">Min</p>
          <p className="col-sm-2">Max</p>
        </div>
        <div className="row">
          <label className="col-sm-2 col-form-label">X</label>
          <input type="number" id="xmin" value={config.xmin} onChange={this.handleChange} size="4" step="0.1" placeholder="XMin" className="form-control col-sm-2" />
          <input type="number" id="xmax" value={config.xmax} onChange={this.handleChange} size="4" step="0.1" placeholder="XMax" className="form-control col-sm-2" />
          <label className="col-sm-2 col-form-label">Pattern</label>
          <input type="text" id="pattern" value={config.pattern} onChange={this.handleChange} size="4" placeholder="Pattern" className="form-control col-sm-2" />
        </div>
        <div className="row">
          <label className="col-sm-2 col-form-label">Y</label>
          <input type="number" id="ymin" value={config.ymin} onChange={this.handleChange} size="4" step="0.1" placeholder="YMin" className="form-control col-sm-2" />
          <input type="number" id="ymax" value={config.ymax} onChange={this.handleChange} size="4" step="0.1" placeholder="YMax" className="form-control col-sm-2" />
          <label className="col-sm-2 col-form-label">Iterations</label>
          <input type="number" id="iterations" value={config.iterations} onChange={this.handleChange} size="4" step="100" placeholder="Iterations" className="form-control col-sm-2" />
        </div>
      </form>
    );
  }
}
