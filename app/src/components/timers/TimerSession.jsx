import React from 'react';
import Row from 'react-flexbox-grid/lib/components/Row';
import Col from 'react-flexbox-grid/lib/components/Col';
import RaisedButton from 'material-ui/lib/raised-button';
import TimerBar from './TimerBar';
import TimerRoundSkipper from './TimerRoundSkipper';
//import {Howler, Howl} from 'howler';
import './TimerSession.scss';
import PureMixin from 'react-pure-render/mixin';
import Pause from 'material-ui/lib/svg-icons/av/pause';
import PlayArrow from 'material-ui/lib/svg-icons/av/play-arrow';
import Replay from 'material-ui/lib/svg-icons/av/replay';

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
      goToRound,
      timerName
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

    const flowControlButton = paused ?
      <PlayArrow className='icon__2x' color='white'/> : <Pause className='icon__2x' color='white' />;

    return (
      <div style={{marginTop: '1em'}}>
      <Row center='xs'>
        <Col className='timer_session' style={{backgroundColor: activeColor}} xs={12} md={10}>
          <Row>
            <Col xs={3} md={2} onClick={() => paused ? startSession() : pauseSession()}
             style={{paddingLeft: 0}}>
              <div className='round_skipper__flow_control round_skipper__button'>{flowControlButton}</div>
            </Col>
            <Col xs={6} md={8}>
              <h1 className='timer_session__name'>{timerName}</h1>
            </Col>
            <Col xs={3} md={2} onClick={resetTimer} style={{paddingRight: 0}}>
              <div className='round_skipper__reset round_skipper__button' style={{float: 'right'}}>
                <Replay className='icon__2x' color='white'/>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className='timer_session__countdown' xs={12}>
              <span>{min(roundRemaining)}:{sec(roundRemaining)}</span>
            </Col>
          </Row>
          <Row around='xs'>
            <Col xs={4} className='timer_session__text'>
              <span>TOTAL ELAPSED</span><br/>
              <span>{min(totalElapsed)}:{sec(totalElapsed)}</span>
            </Col>
            <Col xs={4} className='timer_session__text'>
              <span>ROUND</span><br/>
              <span>{active+1}/{timeline.length}</span>
            </Col>
            <Col xs={4} className='timer_session__text'>
              <span>REMAINING</span><br/>
              <span>{min(totalRemaining)}:{sec(totalRemaining)}</span>
            </Col>
          </Row>
            <TimerRoundSkipper {...roundSkipperProps}/>
        </Col>
      </Row>
      <br/>
      <TimerBar timeline={timeline} active={active} goToRound={goToRound}/>
      </div>
    );
  }
});

export default TimerSession;
