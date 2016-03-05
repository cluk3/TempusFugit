import React from 'react';
import Row from 'react-flexbox-grid/lib/components/Row';
import Col from 'react-flexbox-grid/lib/components/Col';
import RaisedButton from 'material-ui/lib/raised-button';
import TimerBar from './TimerBar';
import TimerRoundSkipper from './TimerRoundSkipper';
//import {Howler, Howl} from 'howler';
import './TimerSession.scss';
import PureMixin from 'react-pure-render/mixin';

// TODO: refactoring into nested components

const TimerSession = React.createClass({
  mixins: [PureMixin],
  render() {
    const {
      totalElapsed,
      totalRemaining,
      roundElapsed,
      roundRemaining,
      timeline,
      active,
      paused,
      activeColor,
      startSession,
      pauseSession,
      nextRound,
      prevRound,
      resetTimer,
      resetRound,
      goToRound
    } = this.props;

    const min = (duration) => {
      let minutes = Math.floor(duration/60);
      if(minutes < 10)
        return '0' + minutes;
      else
        return minutes;
    };
    const sec = (duration) => {
      let seconds = duration%60;
      if(seconds < 10)
        return '0' + seconds;
      else
        return seconds;
    };



    const roundSkipperProps = {
      timeline,
      active,
      paused,
      nextRound,
      prevRound,
      resetRound,
      startSession,
      pauseSession,
      resetTimer,
    };

    return (
      <div>
      <Row center='xs'>
      <Col className='session-timer' style={{backgroundColor: activeColor}} xs={8}>
        <Row>
          <Col style={{fontSize: '12em'}} xs={12}>
            <span>{min(roundRemaining)}:{sec(roundRemaining)}</span>
          </Col>
        </Row>
        <Row around='xs'>
          <Col xs={4}>
            <span>TOTAL ELAPSED</span><br/>
            <span className='session-timer-text'>{min(totalElapsed)}:{sec(totalElapsed)}</span>
          </Col>
          <Col xs={4}>
            <span>ROUND</span><br/>
            <span className='session-timer-text'>{active+1}/{timeline.length}</span>
          </Col>
          <Col xs={4}>
            <span>REMAINING</span><br/>
            <span className='session-timer-text'>{min(totalRemaining)}:{sec(totalRemaining)}</span>
          </Col>
        </Row>
          <TimerRoundSkipper {...roundSkipperProps}/>
      </Col>
      </Row>
      <br/>
      <br/>
      <TimerBar timeline={timeline} active={active} goToRound={goToRound}/>
      </div>
    );
  }
});

export default TimerSession;
