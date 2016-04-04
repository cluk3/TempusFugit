import React from 'react';
import KeyboardArrowUp from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-up';
import KeyboardArrowDown from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-down';
import PureMixin from 'react-pure-render/mixin';
import debounce from 'lodash.debounce';
import Colors from 'material-ui/lib/styles/colors';

const TimeUnitConfig = React.createClass({
  mixins: [PureMixin],
  keyPressHandler(ev) {
    let keyCode = ev.keyCode || ev.which;
    if (keyCode < 48 || keyCode > 57) {
      //codes for backspace, delete, enter
      if (keyCode !== 0 && keyCode !== 8 && keyCode !== 13 && !ev.ctrlKey) {
        ev.preventDefault();
      }
    }
  },
  render() {
    const {
      name,
      onInputChange,
      timeUnit,
      incrHandler,
      decrHandler,
      onWheel,
      onFocus,
      onBlur
    } = this.props;
    return (
      <div className="time-unit">
        <button className='increase' onClick={incrHandler}><KeyboardArrowUp color={Colors.grey400} /></button>
        <input type="text" name={name} maxLength="2" value={timeUnit} className="time-unit--input"
         onChange={onInputChange} onWheel={onWheel} onBlur={onBlur} onFocus={onFocus}
         onKeyPress={this.keyPressHandler} ></input>
        <button className='decrease' onClick={decrHandler}><KeyboardArrowDown color={Colors.grey400} /></button>
      </div>
    );
  }
});

export default TimeUnitConfig;
