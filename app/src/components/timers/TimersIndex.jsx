import React from 'react';
import Row from 'react-flexbox-grid/lib/components/Row';
import Col from 'react-flexbox-grid/lib/components/Col';
import TimerElement from './TimerElement';
var PureMixin = require('react-pure-render/mixin');
import { getTimeline, getTotalTime } from '../../reducers/timers/newTimer';

const TimersIndex = React.createClass({
  mixins: [PureMixin],
  componentDidMount() {
    this.props.fetchTimers();
  },
  render() {
    const {
      timers,
      startSession,
      deleteTimer
    } = this.props;
    const TimersList = timers.map((timer, i) => {
      const timerProps = {
        intervalNames: timer.intervals
          .map((interval) => interval.type).join(', '),
        totalTime: getTotalTime(timer),
        timeline: getTimeline(timer),
        startSession,
        deleteTimer,
        timer
      };
      return (
        <TimerElement {...timerProps} key={i}/>
      );
    });
    return(
      <Row around='xs'>
        <Col xs={12}>
          {TimersList}
        </Col>
      </Row>
    );
  }
});

export default TimersIndex;
