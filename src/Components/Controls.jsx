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
    const { config } = this.props;

    return (
      <form>
        <div className="row">
          <p className="offset-sm-1 col-sm-1">Min</p>
          <p className="col-sm-1">Max</p>
        </div>
        <div className="row">
          <label className="col-sm-1 col-form-label">X</label>
          <input type="number" id="xmin" value={config.xmin} onChange={this.handleChange} size="4" step="0.1" placeholder="XMin" className="form-control col-sm-1" />
          <input type="number" id="xmax" value={config.xmax} onChange={this.handleChange} size="4" step="0.1" placeholder="XMax" className="form-control col-sm-1" />
          <label className="col-sm-1 col-form-label">Pattern</label>
          <input type="text" id="pattern" value={config.pattern} onChange={this.handleChange} size="4" placeholder="Pattern" className="form-control col-sm-1" />
        </div>
        <div className="row">
          <label className="col-sm-1 col-form-label">Y</label>
          <input type="number" id="ymin" value={config.ymin} onChange={this.handleChange} size="4" step="0.1" placeholder="YMin" className="form-control col-sm-1" />
          <input type="number" id="ymax" value={config.ymax} onChange={this.handleChange} size="4" step="0.1" placeholder="YMax" className="form-control col-sm-1" />
          <label className="col-sm-1 col-form-label">Iterations</label>
          <input type="number" id="iterations" value={config.iterations} onChange={this.handleChange} size="4" step="100" placeholder="Iterations" className="form-control col-sm-1" />
        </div>
      </form>
    );
  }
}
