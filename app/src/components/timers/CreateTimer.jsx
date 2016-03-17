import React from 'react';
import CreateInterval from './CreateInterval';
import TextField from 'material-ui/lib/text-field';
import Row from 'react-flexbox-grid/lib/components/Row';
import Col from 'react-flexbox-grid/lib/components/Col';
import RaisedButton from 'material-ui/lib/raised-button';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
var PureMixin = require('react-pure-render/mixin');
import debounce from 'lodash.debounce';

// TODO:
// implement loop (disable repeat)
// scroll to added round/interval
// Validations ( Timer name)
const CreateTimer = React.createClass({
  mixins: [PureMixin],
  componentWillMount() {
    this.onTimerNameChange = debounce(this.props.onTimerNameChange, 500);
    this.onIntervalTypeChange = debounce(this.props.onIntervalTypeChange, 500);
    this.onIntervalRepeatChange = debounce(this.props.onIntervalRepeatChange, 500);
    this.onRoundNameChange = debounce(this.props.onRoundNameChange, 500);
  },
  render() {
    const {
      name,
      onAddInterval,
      intervals,
      onRemoveInterval,
      onAddRound,
      onRemoveRound,
      onRoundColorChange,
      onRoundDurationChange,
      totalTime,
      saveTimer
    } = this.props;

    const Intervals = intervals.map((interval,i) => {
      const intervalProps = {
        type: interval.type,
        repeat: interval.repeat,
        rounds: interval.rounds,
        onRemoveInterval,
        onAddRound,
        onRemoveRound,
        onIntervalTypeChange: this.onIntervalTypeChange,
        onIntervalRepeatChange: this.onIntervalRepeatChange,
        onRoundNameChange: this.onRoundNameChange,
        onRoundColorChange,
        onRoundDurationChange,
      };
      return <CreateInterval key={i} {...intervalProps} intervalIndex={i}/>;
    });

    return (
      <Row center='xs'>
      <Col xs = {12}>
        <Row><Col xs={12}><h2>Create new Timer:</h2></Col></Row>
        <Row middle='xs'>
        <Col xs={6}>
          <TextField
            hintText = 'Insert timer name'
            floatingLabelText = 'Timer Name'
            maxLength={20}
            type="text"
            defaultValue='MyNewTimer'
            onChange= {(ev) => {
              ev.persist();
              this.onTimerNameChange(ev.target.value);
            }}
            name = 'timerName'
            //errorText = {error}
          />
        </Col>
        <Col xs={6}><p>{Math.floor(totalTime/60)} minutes, {totalTime%60} seconds</p></Col>
        </Row>
          {Intervals}
          <br/>
        <Row>
        <Col xsOffset={8} xs={2}><p>Add Interval</p></Col>
        <Col xs={1}>
          <FloatingActionButton onMouseDown={() => onAddInterval()}>
          <ContentAdd />
          </FloatingActionButton>
        </Col>
        </Row>
        <Row>
        <Col xs={12}>
          <RaisedButton onMouseUp={() => saveTimer({name, intervals})} label="Create Timer" primary={true}/>
          <RaisedButton onMouseUp={() => saveTimer({name, intervals}, true)} label="Start Timer" primary={true}/>
        </Col>
        </Row>
        <br/>
        <br/>
      </Col>
      </Row>
    );
  }
});

export default CreateTimer;
