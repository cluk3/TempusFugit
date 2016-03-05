import { connect } from 'react-redux';
import { addInterval, removeInterval, setTimerName } from '../actions/timer';
import { addRound, removeRound, setType, setRepeat } from '../actions/timer/interval';
import { setRoundName, setColor, setDuration } from '../actions/timer/round';
import CreateTimer from '../components/timers/CreateTimer';
import { getTotalTime } from '../reducers/timer';
import { initState } from '../actions/timer/session';
import { routeActions } from 'react-router-redux';
import debounce from 'lodash.debounce';


const mapStateToProps = (state, ownProps) => {
  const timer = state.timer;
  return {
    name: timer.name,
    intervals: timer.intervals,
    totalTime: getTotalTime(timer),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    onAddInterval: () => dispatch(addInterval()),
    onRemoveInterval: (index) => dispatch(removeInterval(index)),
    onTimerNameChange: (name) => dispatch(setTimerName(name)),
    onAddRound: (intervalIndex, roundIndex) => dispatch(addRound(intervalIndex, roundIndex)),
    onRemoveRound: (roundIndex, intervalIndex) => dispatch(removeRound(roundIndex, intervalIndex)),
    onIntervalTypeChange: (intervalType, intervalIndex) => dispatch(setType(intervalType, intervalIndex)),
    onIntervalRepeatChange: (repeat, intervalIndex) => dispatch(setRepeat(repeat, intervalIndex)),
    onRoundNameChange:
      (name, intervalIndex, roundIndex) => dispatch(setRoundName(name, intervalIndex, roundIndex)),
    onRoundColorChange:
      (color, intervalIndex, roundIndex) => dispatch(setColor(color, intervalIndex, roundIndex)),
    onRoundDurationChange:
      (duration, intervalIndex, roundIndex) => dispatch(setDuration(duration, intervalIndex, roundIndex)),
    startTimerSession: (timer) => {
      dispatch(initState(timer));
      dispatch(routeActions.push('/session'));
    }
  };
};

const CreateTimerPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTimer);

export default CreateTimerPage;
