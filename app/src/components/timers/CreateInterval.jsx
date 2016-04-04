import React from 'react';
import CreateRound from './CreateRound';
import TextField from 'material-ui/lib/text-field';
import Row from 'react-flexbox-grid/lib/components/Row';
import Col from 'react-flexbox-grid/lib/components/Col';
import Paper from 'material-ui/lib/paper';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import ContentRemove from 'material-ui/lib/svg-icons/content/remove';
import PureMixin from 'react-pure-render/mixin';
import RaisedButton from 'material-ui/lib/raised-button';

//TODO:
const CreateInterval = React.createClass({
  mixins: [PureMixin],
  validateIntervalRepeat(repeat) {
    if(repeat === '')
      return 'Repeat can\'t be blank';
    return '';
  },
  render() {
    const {
      type,
      repeat,
      rounds,
      intervalIndex,
      onRemoveInterval,
      onAddRound,
      onRemoveRound,
      onIntervalTypeChange,
      onIntervalRepeatChange,
      onRoundNameChange,
      onRoundColorChange,
      onRoundDurationChange,
    } = this.props;

    const Rounds = rounds.map((round, i) => {
      const roundProps = {
        name: round.name,
        color: round.color,
        duration: round.duration,
        onRoundNameChange,
        onRoundColorChange,
        onRemoveRound,
        onRoundDurationChange,
        intervalIndex
      };
      return <CreateRound key={i} {...roundProps} roundIndex={i}/>;
    });

    return (
      <Row center='xs' >
        <Col xs={12} md={11} style={{'border': '2px solid orange', 'borderRadius': '20px'}}>
        <Row around='xs' style={{'position': 'relative'}}>
          <Col xs={12}><h3>Create new Interval</h3></Col>
          <FloatingActionButton style={{"margin": '2px', 'position': 'absolute', 'right': 0}} secondary={true} mini={true} onMouseDown={() => onRemoveInterval(intervalIndex)}>
            <ContentRemove />
          </FloatingActionButton>
        </Row>
        <Row middle='xs'>
          <Col xs={12} md={6}>
            <TextField
              hintText = 'Insert interval type'
              floatingLabelText = 'Interval Type'
              maxLength={15}
              minLength={1}
              onChange = {(ev) => {
                ev.persist();
                onIntervalTypeChange(ev.target.value, intervalIndex);
              }}
              name = 'intervalType'
              //errorText = {error}
              >
            </TextField>
          </Col>
          <Col xs={12} md={6}>
            <TextField type='number' min='1'
              hintText = 'Times to repeat the interval'
              floatingLabelText = 'Interval repeats'
              defaultValue={repeat}
              onChange = {(ev) => {
                ev.persist();
                onIntervalRepeatChange(ev.target.value, intervalIndex);
              }}
              errorText = {this.validateIntervalRepeat(repeat)}
            />
          </Col>
        </Row>
          {Rounds}
          <br/>
        <Row end='xs'>
          <Col xs={12} md={10}>
          <RaisedButton style={{
              'position': 'relative',
              'left': 0,
              'top': -8
            }}
            onMouseUp={() => onAddRound(intervalIndex, Rounds.length)} label='Add Round' primary={true} icon={<ContentAdd />} />
          </Col>
        </Row>
      </Col>
    </Row>
    );
  }
});

export default CreateInterval;
