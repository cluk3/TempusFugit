import React from 'react';
import Row from 'react-flexbox-grid/lib/components/Row';
import Col from 'react-flexbox-grid/lib/components/Col';
import SkipNext from 'material-ui/lib/svg-icons/av/skip-next';
import SkipPrevious from 'material-ui/lib/svg-icons/av/skip-previous';
import Pause from 'material-ui/lib/svg-icons/av/pause';
import PlayArrow from 'material-ui/lib/svg-icons/av/play-arrow';
import Replay from 'material-ui/lib/svg-icons/av/replay';
import './TimerSession.scss';

const TimerRoundSkipper = (props) => {
  const {
    timeline,
    active,
    resetRound,
    nextRound,
    prevRound,
    paused,
    resetTimer,
    startSession,
    pauseSession
  } = props;
  const prev = timeline[active-1];
  const curr = timeline[active];
  const next = timeline[active+1];
  const flowControlButton = paused ?
    <PlayArrow style={{marginTop: 6}} color='white'/> : <Pause style={{marginTop: 6}} color='white' />;
  let Prev, Curr, Next;
  Curr = <Col xs={4} onClick={resetRound} className='session-round curr-round'>
    <span className='session-timer-text'>{timeline[active].name}</span>
    </Col>;

  if(active === 0) { // the first round is active
    Prev = <Col xs={3} className='session-round round-inactive'></Col>;
    Next = timeline.length === 1 ? // it is the only round
      <Col xs={3} className='session-round round-inactive'></Col>
      :
      (
        <Col xs={3} onClick={nextRound}
          style={{backgroundColor: next.color}}
          className='session-round'>
          <Row middle='xs'>
          <Col xs={9}>
            <span className='session-timer-text'>{next.name}</span>
          </Col>
          <Col xs={3}>
            <SkipNext color='white' style={{marginTop: 6}}/>
          </Col>
          </Row>
        </Col>
      );
  } else if(active === timeline.length - 1) { // last round is active
    Prev = (
      <Col xs={3} onClick={prevRound}
        style={{backgroundColor: prev.color}}
        className='session-round'>
        <Row middle='xs'>
        <Col xs={3}>
          <SkipPrevious color='white' style={{marginTop: 6}}/>
        </Col>
        <Col xs={9}>
          <span className='session-timer-text'>{prev.name}</span>
        </Col>
        </Row>
      </Col>
    );
    Next = <Col xs={3} className='session-round round-inactive'>
      </Col>;
  } else {
    Prev = (
      <Col xs={3} onClick={prevRound}
        style={{backgroundColor: prev.color}}
        className='session-round'>
        <Row middle='xs'>
        <Col xs={3}>
          <SkipPrevious color='white' style={{marginTop: 6}}/>
        </Col>
        <Col xs={9}>
          <span className='session-timer-text'>{prev.name}</span>
        </Col>
        </Row>
      </Col>
    );
    Next = (
      <Col xs={3} onClick={nextRound}
        style={{backgroundColor: next.color}}
        className='session-round'>
        <Row middle='xs'>
        <Col xs={9}>
          <span className='session-timer-text'>{next.name}</span>
        </Col>
        <Col xs={3}>
          <SkipNext color='white' style={{marginTop: 6}}/>
        </Col>
        </Row>
      </Col>
    );
  }
  return (
      <Row>
        <Col xs={1} onClick={resetTimer} className='session-round'>
        <Replay style={{marginTop: 6}} color='white'/>
        </Col>
        {Prev}
        {Curr}
        {Next}
        <Col xs={1} onClick={() => paused ? startSession() : pauseSession()}
         className='session-round'>
          {flowControlButton}
        </Col>
      </Row>
  );
};

export default TimerRoundSkipper;
