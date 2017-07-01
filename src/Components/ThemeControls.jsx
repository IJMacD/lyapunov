import React, {Component } from 'react';

export default class ThemeControls extends Component {
  constructor () {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (key) {
    return (color) => {
      const { theme, onChange } = this.props;

      onChange({
        ...theme,
        [key]: color,
      });
    };
  }

  render() {
    const { theme, onChange, ...otherProps } = this.props;

    return (
      <div { ...otherProps }>
        <ColorPicker title="Stable" color={theme.stable} onChange={this.handleChange("stable")} />
        <ColorPicker title="Chaos" color={theme.chaos} onChange={this.handleChange("chaos")} />
      </div>
    );
  }
}

function ColorPicker (props) {
  const colors = ["Yellow", "Red", "Green", "Blue", "Light Blue", "Cyan", "Magenta", "Pink", "Orange", "Black", "White"];
  const pickerName = "colorpicker_" + props.title;

  return (
    <form className="form-inline">
      <fieldset className="form-group">
        <label>{ props.title }</label>
        <select className="form-control" name={pickerName} value={props.color} onChange={e => props.onChange(e.target.value)}>
        {
          colors.map(color => {
            const key = color.toLowerCase().replace(/\s+/g, "");

            return <option key={key} value={key}>{ color }</option>;
          })
        }
        </select>
      </fieldset>
    </form>
  );
}
