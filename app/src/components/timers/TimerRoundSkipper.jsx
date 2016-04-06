import React from 'react';
import Row from 'react-flexbox-grid/lib/components/Row';
import Col from 'react-flexbox-grid/lib/components/Col';
import SkipNext from 'material-ui/lib/svg-icons/av/skip-next';
import SkipPrevious from 'material-ui/lib/svg-icons/av/skip-previous';

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
  let Prev, Curr, Next;
  Curr = <Col xs={4} onClick={resetRound}
          className='round_skipper--current round_skipper__button'>
            <Row middle='xs'>
              <Col xs={12}>
                <span>{timeline[active].name}</span>
              </Col>
            </Row>
          </Col>;

  if(active === 0) { // the first round is active
    Prev = <Col xs={4} className='round_skipper--inactive'></Col>;
    Next = timeline.length === 1 ? // it is the only round
      <Col xs={4} className='round_skipper--inactive'></Col>
      :
      (
        <Col xs={4} onClick={nextRound}
          style={{backgroundColor: next.color}}
          className='round_skipper__text round_skipper__button'>
          <Row middle='xs'>
          <Col xs={7}>
            <span className=''>{next.name}</span>
          </Col>
          <Col xs={5}>
            <SkipNext color='white'/>
          </Col>
          </Row>
        </Col>
      );
  } else if(active === timeline.length - 1) { // last round is active
    Prev = (
      <Col xs={4} onClick={prevRound}
        style={{backgroundColor: prev.color}}
        className='round_skipper__text round_skipper__button'>
        <Row middle='xs'>
        <Col xs={5}>
          <SkipPrevious color='white'/>
        </Col>
        <Col xs={7}>
          <span>{prev.name}</span>
        </Col>
        </Row>
      </Col>
    );
    Next = <Col xs={4} className=' round_skipper--inactive'>
      </Col>;
  } else {
    Prev = (
      <Col xs={4} onClick={prevRound}
        style={{backgroundColor: prev.color}}
        className='round_skipper__text round_skipper__button'>
        <Row middle='xs'>
        <Col xs={5}>
          <SkipPrevious color='white'/>
        </Col>
        <Col xs={7}>
          <span>{prev.name}</span>
        </Col>
        </Row>
      </Col>
    );
    Next = (
      <Col xs={4} onClick={nextRound}
        style={{backgroundColor: next.color}}
        className='round_skipper__text round_skipper__button'>
        <Row middle='xs'>
        <Col xs={7}>
          <span>{next.name}</span>
        </Col>
        <Col xs={5}>
          <SkipNext color='white'/>
        </Col>
        </Row>
      </Col>
    );
  }
  return (
    <Row className='round_skipper' middle='xs'>
      {Prev}
      {Curr}
      {Next}
    </Row>
  );
};

export default TimerRoundSkipper;
