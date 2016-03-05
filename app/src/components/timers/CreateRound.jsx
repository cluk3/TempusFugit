import React from 'react';
import IntervalConfig from './IntervalConfig';
import TextField from 'material-ui/lib/text-field';
import Row from 'react-flexbox-grid/lib/components/Row';
import Col from 'react-flexbox-grid/lib/components/Col';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Paper from 'material-ui/lib/paper';
import PureMixin from 'react-pure-render/mixin';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentRemove from 'material-ui/lib/svg-icons/content/remove';
import RoundColors from '../../constants/RoundColors';

//TODO
const CreateRound = React.createClass({
  mixins: [PureMixin],
  render() {
    const {
      name,
      color,
      duration,
      onRoundNameChange,
      onRoundColorChange,
      onRoundDurationChange,
      roundIndex,
      onRemoveRound,
      intervalIndex
    } = this.props;
    return (
      <Row center='xs'>
      <Col xs={10} style={{'border': '2px solid purple', 'borderRadius': '20px'}}>
        <Row>
        <Col xs={10}><h3>Create new Round</h3></Col>
        <Col xs={2}>
          <FloatingActionButton
           style={{"margin": '8px'}}
           secondary={true} mini={true}
           onMouseDown={() => onRemoveRound(roundIndex, intervalIndex)}>
            <ContentRemove />
          </FloatingActionButton>
        </Col>
        </Row>
        <Row middle='xs'>
        <Col xs={6}>
          <TextField
            hintText = 'Insert round name'
            floatingLabelText = 'Round Name'
            defaultValue={name}
            type='text'
            maxLength={15}
            onChange = {(ev) => {
              ev.persist();
              onRoundNameChange(ev.target.value, intervalIndex, roundIndex);
            }}
            name = 'roundName'
            //errorText = {error}
            >
          </TextField>
          </Col>
          <Col xs={6}>
          <IntervalConfig duration={duration}
          updateDuration={(dur) => onRoundDurationChange(dur, intervalIndex, roundIndex)}/>
          </Col></Row>
          <SelectField hintText = 'Set color'
          value={color}
          floatingLabelText = 'Color'
          onChange = { (e,i, value) => onRoundColorChange(value, intervalIndex, roundIndex) }>
            <MenuItem value={RoundColors[0]} primaryText='Green'/>
            <MenuItem value={RoundColors[1]} primaryText='Orange'/>
            <MenuItem value={RoundColors[2]} primaryText='Blue'/>
            <MenuItem value={RoundColors[3]} primaryText='Yellow'/>
            <MenuItem value={RoundColors[4]} primaryText='Purple'/>
          </SelectField>
          <br/>
          <br/>
      </Col>
      </Row>
    );
  }
});

export default CreateRound;
