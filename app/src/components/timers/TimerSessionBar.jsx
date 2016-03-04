import React from 'react';
import Row from 'react-flexbox-grid/lib/components/Row';
import Col from 'react-flexbox-grid/lib/components/Col';

const TimerSessionBar = (props) => {
  const { timeline, active, goToRound } = props;
  const totalTime = timeline.reduce((prev, curr) => prev + curr.duration, 0);
  const roundBars = timeline.map((round, i) => {
    const width = Math.floor((round.duration/totalTime)*100)-1;
    const style = {
      display: 'inline-flex',
      width: width+'%',
      backgroundColor: round.color,
      color: 'white',
      justifyContent: 'center',
      cursor: 'pointer',
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
      <div key={i} style={style} onClick={() => goToRound(i)}>
        <p style={{textOverflow:'ellipsis',maxWidth: '100%', overflow: 'hidden'}}>{timeline[i].name}</p>
      </div>
    );
  });
  return (
    <Row center='xs' ><Col xs={10}>{roundBars}</Col></Row>
  );
};

export default TimerSessionBar;
