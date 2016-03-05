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

//TODO:
const CreateInterval = React.createClass({
  mixins: [PureMixin],
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
      <Col xs={11} style={{'border': '2px solid orange', 'borderRadius': '20px'}}>
      <Row around='xs'>
      <Col xs={11}><h3>Create new Interval</h3></Col>
      <Col xs={1}>
        <FloatingActionButton style={{"margin": '8px'}} secondary={true} mini={true} onMouseDown={() => onRemoveInterval(intervalIndex)}>
          <ContentRemove />
        </FloatingActionButton>
      </Col></Row>
      <Row middle='xs' style={{margin: '32px 0'}}>
      <Col xs={6}>
        <TextField
          hintText = 'Insert interval type'
          floatingLabelText = 'Interval Type'
          maxLength={15}
          onChange = {(ev) => {
            ev.persist();
            onIntervalTypeChange(ev.target.value, intervalIndex);
          }}
          name = 'intervalType'
          //errorText = {error}
          >
        </TextField>
        </Col>
        <Col xs={6}>
        <TextField type='number' min='1'
          hintText = 'Times to repeat the interval'
          floatingLabelText = 'Interval repeats'
          defaultValue={repeat}
          onChange = {(ev) => {
            ev.persist();
            onIntervalRepeatChange(ev.target.value, intervalIndex);
          }}
        />
        </Col></Row>
        {Rounds}
        <br/>
        <Row end='xs'>
        <Col xs={2}><p>Add Round</p></Col>
        <Col xs={1}>
        <FloatingActionButton onMouseDown={() => onAddRound(intervalIndex, Rounds.length)}>
          <ContentAdd />
        </FloatingActionButton>
        </Col>
        </Row>
        <br/>
      </Col>
      </Row>
    );
  }
});

export default CreateInterval;
