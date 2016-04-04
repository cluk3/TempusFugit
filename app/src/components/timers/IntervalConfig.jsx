import React from 'react';
import TimeUnitConfig from './TimeUnitConfig';
import './IntervalConfig.scss';
import PureMixin from 'react-pure-render/mixin';

const IntervalConfig = React.createClass({ // Props: minutes, seconds, onTimeUnitChange
  mixins: [PureMixin],
  getInitialState() {
    const seconds = this.props.duration % 60;
    const minutes = Math.floor(this.props.duration / 60);
    return {
      minutes,
      seconds,
      focused: false
    };
  },
  onTimeUnitChange(ev) {
    const timeUnit = ev.target.name;
    const value = +ev.target.value;
    if(timeUnit === 'seconds') {
      this.setState({
        [timeUnit]: value > 59 ? 59 : value
      });
    } else {
      this.setState({
        [timeUnit]: value
      });
    }

  },
  minIncrHandler(ev) {
    this.setState(function(prevState) {
      return {minutes: prevState.minutes+1};
    });
  },
  minDecrHandler(ev) {
    this.setState(function(prevState) {
      let minutes = prevState.minutes === 0 ? 0 : prevState.minutes-1 ;
      return {minutes};
    });
  },
  secIncrHandler(ev) {
    this.setState(function(prevState) {
      let seconds = prevState.seconds === 59 ? 0 : prevState.seconds+1;
      return {seconds};
    });
  },
  secDecrHandler(ev) {
    this.setState(function(prevState) {
      let seconds = prevState.seconds === 0 ? 59 : prevState.seconds-1 ;
      return {seconds};
    });
  },
  mouseLeaveHandler(){
    const {minutes, seconds} = this.state;
    const duration = minutes*60 + seconds;
    if(this.props.duration !== duration)
      this.props.updateDuration(duration);
  },
  focusHandler() {
    this.setState({focused: true});
  },
  blurHandler() {
    this.setState({focused: false});
  },
  wheelHandler(ev) {
    if(this.state.focused) {
      ev.preventDefault();
      if(ev.deltaY > 0) {
        if(ev.target.name === 'seconds') {
          this.setState(function(prevState) {
            let seconds = prevState.seconds === 0 ? 59 : prevState.seconds-1 ;
            return {seconds};
          });
        } else {
          this.setState(function(prevState) {
            let minutes = prevState.minutes === 0 ? 0 : prevState.minutes-1 ;
            return {minutes};
          });
        }
      } else {
        if(ev.target.name === 'seconds') {
          this.setState(function(prevState) {
            let seconds = prevState.seconds === 59 ? 0 : prevState.seconds+1;
            return {seconds};
          });
        } else {
          this.setState(function(prevState) {
            return {minutes: prevState.minutes+1};
          });
        }
      }
    }
  },
  render() {
    const {minutes, seconds} = this.state;
    const timeUnitProps = {
      onWheel: this.wheelHandler,
      onInputChange: this.onTimeUnitChange,
    };
    const errorClass = !this.props.duration ? 'time-error' : '';
    return (
      <div className={'time '+errorClass} onMouseLeave={this.mouseLeaveHandler} onFocus={this.focusHandler}
      onBlur={this.blurHandler}>
        <TimeUnitConfig name='minutes'
         incrHandler={this.minIncrHandler}
         decrHandler={this.minDecrHandler} timeUnit={minutes}
         {...timeUnitProps} />
        <div className="time-colon">:</div>
        <TimeUnitConfig name='seconds'
         incrHandler={this.secIncrHandler}
         decrHandler={this.secDecrHandler} timeUnit={seconds}
         {...timeUnitProps}/>
         <em>seconds</em>
         <hr className={this.state.focused ? 'time--focused' : ''}/>
      </div>
    );
  }
});

export default IntervalConfig;
