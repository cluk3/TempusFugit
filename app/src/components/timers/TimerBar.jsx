import React from 'react';
import Row from 'react-flexbox-grid/lib/components/Row';
import Col from 'react-flexbox-grid/lib/components/Col';
var PureMixin = require('react-pure-render/mixin');
import ReactTooltip from 'react-tooltip';

const TimerSessionBar = (props) => {
  const { timeline, active, goToRound } = props;
  const totalTime = timeline.reduce((prev, curr) => prev + curr.duration, 0);
  const roundBars = timeline.map((round, i) => {
    const width = Math.floor((round.duration/totalTime)*90);
    const style = {
      display: 'inline-flex',
      width: width+'%',
      backgroundColor: round.color,
      color: 'white',
      justifyContent: 'center',
      cursor: 'pointer',
      minHeight: 32,
      overflow: 'hidden',
      fontSize: 12
    };
    if(i === active)
      style.border = '2px dotted white';
    else {
      style.borderLeft = '1px solid white';
      style.borderRight = '1px solid white';
    }
    if(i===0) {
      style.borderRadius = '5px 0 0 5px';
    } else if (i === timeline.length-1) {
      style.borderRadius = '0 5px 5px 0';
    }
    return (
        <div key={i} data-tip={round.name+'<br/>Duration: '+round.duration+'s'}
        style={style} onClick={() => goToRound && goToRound(i)}>
        </div>
    );
  });
  return (
    <Row center='xs' >
      <Col xs={12}>
      {roundBars}
      <ReactTooltip multiline={true} place='top' type='dark' effect='solid'/>
      </Col>
    </Row>
  );
};

export default TimerSessionBar;
