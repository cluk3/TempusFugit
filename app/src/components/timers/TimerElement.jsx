import React from 'react';
import Row from 'react-flexbox-grid/lib/components/Row';
import Col from 'react-flexbox-grid/lib/components/Col';
import RaisedButton from 'material-ui/lib/raised-button';
import IconButton from 'material-ui/lib/icon-button';
import ActionDelete from 'material-ui/lib/svg-icons/action/delete';
var PureMixin = require('react-pure-render/mixin');
import TimerBar from './TimerBar';


const TimersIndex = React.createClass({
  mixins: [PureMixin],
  getInitialState() {
    return {
      isOver: false
    };
  },
  mouseEnterHandler() {
    this.setState({isOver: true});
  },
  mouseLeaveHandler() {
    this.setState({isOver: false});
  },
  render() {
    const {
      intervalNames,
      totalTime,
      startSession,
      deleteTimer,
      timer,
      timeline
    } = this.props;
    return (
      <Row onMouseEnter={this.mouseEnterHandler}
      onMouseLeave={this.mouseLeaveHandler} >
        <Col xs={12}>
          <Row>
            <Col xs={10}>
            <h3>{timer.name}</h3>
            </Col>
            <Col xs={1}>
            {this.state.isOver &&
              <IconButton tooltip="Delete"
              onMouseUp={() => deleteTimer(timer.id)}>
                <ActionDelete/>
              </IconButton>
            }
            </Col>
            <Col xs={1}>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <p>Total duration: - {Math.floor(totalTime/60)} minutes, {totalTime%60} seconds</p>
            </Col>
            <Col xs={6}>
              {intervalNames && <p>Intervals: {intervalNames}</p>}
            </Col>
          </Row>
          <TimerBar timeline={timeline} />
          <Row center='xs'><RaisedButton primary={true} onMouseUp={() => startSession(timer)} label="Start" /></Row>
        </Col>
      </Row>
    );
  }
});

export default TimersIndex;
