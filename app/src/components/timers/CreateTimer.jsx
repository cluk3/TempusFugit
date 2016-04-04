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
import Colors from 'material-ui/lib/styles/colors';

// TODO:
// implement loop (disable repeat)
// scroll to added round/interval
// Validations:
//   round duration can't be 0
//   Timer should have at least 1 interval with one round
const CreateTimer = React.createClass({
  mixins: [PureMixin],
  componentWillMount() {
    this.onTimerNameChange = debounce(this.props.onTimerNameChange, 500);
    this.onIntervalTypeChange = debounce(this.props.onIntervalTypeChange, 500);
    this.onIntervalRepeatChange = debounce(this.props.onIntervalRepeatChange, 500);
    this.onRoundNameChange = debounce(this.props.onRoundNameChange, 500);
  },
  validateTimerName(name) {
    if(name === '')
      return 'Name can\'t be blank';
    return '';
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
          <Col xs={12} md={6}>
            <TextField
              hintText = 'Insert timer name'
              floatingLabelText = 'Timer Name'
              maxLength={20}
              type='text'
              defaultValue={name}
              onChange= {(ev) => {
                ev.persist();
                this.onTimerNameChange(ev.target.value);
              }}
              name = 'timerName'
              minLength={1}
              errorText = {this.validateTimerName(name)}
            />
          </Col>
          <Col xs={12} md={6}>
            <p>
              <em>Total duration:</em> {Math.floor(totalTime/60)} minutes, {totalTime%60} seconds
            </p>
          </Col>
        </Row>
          {Intervals}
          <br/>
          <Row end='xs'>
            <Col xs={12} md={10}>
            <RaisedButton style={{
                'position': 'relative',
                'left': 0,
                'top': -8
              }}
              onMouseUp={() => onAddInterval()} label='Add Interval' primary={true} icon={<ContentAdd />} />
            </Col>
          </Row>
        <Row around='xs'>
          <Col xs={12}>
            <RaisedButton backgroundColor={Colors.deepPurple600} labelColor='white' style={{'marginRight': 16}} onMouseUp={() => saveTimer({name, intervals})} label='Save Timer'/>
            <RaisedButton backgroundColor={Colors.deepPurple600} labelColor='white' onMouseUp={() => saveTimer({name, intervals}, true)} label='Start Timer'/>
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
