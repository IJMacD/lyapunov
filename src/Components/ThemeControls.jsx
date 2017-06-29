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
    const { theme } = this.props;

    return (
      <div style={{display:"flex"}}>
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
    <form>
      <fieldset class="form-group">
        <legend>{props.title}</legend>
        {
          colors.map(color => {
            const key = color.toLowerCase().replace(/\s+/g, "");

            return (
              <div class="form-check">
                <label class="form-check-label">
                  <input type="radio" class="form-check-input" name={pickerName} value={key} checked={key === props.color} />
                  { color }
                </label>
              </div>
            );
          })
        }
      </fieldset>
    </form>
  );
}
