import React from 'react';
import Row from 'react-flexbox-grid/lib/components/Row';
import Col from 'react-flexbox-grid/lib/components/Col';
import RaisedButton from 'material-ui/lib/raised-button';
import Pause from 'material-ui/lib/svg-icons/av/pause';
import PlayArrow from 'material-ui/lib/svg-icons/av/play-arrow';
import Replay from 'material-ui/lib/svg-icons/av/replay';
import SkipNext from 'material-ui/lib/svg-icons/av/skip-next';
import SkipPrevious from 'material-ui/lib/svg-icons/av/skip-previous';
import TimerSessionBar from './TimerSessionBar';
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

    const flowControlButton = paused ?
      <PlayArrow style={{marginTop: 6}} color='white'/> : <Pause style={{marginTop: 6}} color='white' />;

    let prev, curr, next;
    curr = <Col xs={4} onClick={resetRound} className='session-round curr-round'>
      <span className='session-timer-text'>{timeline[active].name}</span>
      </Col>;
    if(active === 0) {
      prev = <Col xs={3} className='session-round round-inactive'></Col>;
      next = (
        <Col xs={3} onClick={nextRound} className='session-round'>
          <Row middle='xs'>
          <Col xs={9}>
            <span className='session-timer-text'>{timeline[active+1].name}</span>
          </Col>
          <Col xs={3}>
            <SkipNext color='white' style={{marginTop: 6}}/>
          </Col>
          </Row>
        </Col>
      );
    } else if(active === timeline.length - 1) {
      prev = (
        <Col xs={3} onClick={prevRound} className='session-round'>
          <Row middle='xs'>
          <Col xs={3}>
            <SkipPrevious color='white' style={{marginTop: 6}}/>
          </Col>
          <Col xs={9}>
            <span className='session-timer-text'>{timeline[active-1].name}</span>
          </Col>
          </Row>
        </Col>
      );
      next = <Col xs={3} className='session-round round-inactive'>
        </Col>;
    } else {
      prev = (
        <Col xs={3} onClick={prevRound} className='session-round'>
          <Row middle='xs'>
          <Col xs={3}>
            <SkipPrevious color='white' style={{marginTop: 6}}/>
          </Col>
          <Col xs={9}>
            <span className='session-timer-text'>{timeline[active-1].name}</span>
          </Col>
          </Row>
        </Col>
      );
      next = (
        <Col xs={3} onClick={nextRound} className='session-round'>
          <Row middle='xs'>
          <Col xs={9}>
            <span className='session-timer-text'>{timeline[active+1].name}</span>
          </Col>
          <Col xs={3}>
            <SkipNext color='white' style={{marginTop: 6}}/>
          </Col>
          </Row>
        </Col>
      );
    }

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
        <Row>
          <Col xs={1} onClick={resetTimer} className='session-round'>
          <Replay style={{marginTop: 6}} color='white'/>
          </Col>
          {prev}
          {curr}
          {next}
          <Col xs={1} onClick={() => paused ? startSession() : pauseSession()}
           className='session-round'>
            {flowControlButton}
          </Col>
        </Row>
      </Col>
      </Row>
      <br/>
      <br/>
      <TimerSessionBar timeline={timeline} active={active} goToRound={goToRound}/>
      </div>
    );
  }
});

export default TimerSession;
