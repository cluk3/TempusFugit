import { connect } from 'react-redux';
import { addInterval, removeInterval, setTimerName } from '../actions/timer/newTimer';
import { addRound, removeRound, setType, setRepeat } from '../actions/timer/interval';
import { setRoundName, setColor, setDuration } from '../actions/timer/round';
import CreateTimer from '../components/timers/CreateTimer';
import { getTotalTime } from '../reducers/timers/newTimer';
import { initState } from '../actions/timer/session';
import { routeActions } from 'react-router-redux';
import debounce from 'lodash.debounce';
import fetch from 'isomorphic-fetch';
import { openSnackbar } from '../actions/snackbar';
import { setErr } from '../actions/errors';
import config from '../../../config';


const mapStateToProps = (state, ownProps) => {
  const timer = state.newTimer;
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
    saveTimer: (timer, shouldStart) => {
      const fetchOpts =  {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(timer)
      };

      return fetch(config.app.host + '/api/timers', fetchOpts)
      .catch( (error) => {
        dispatch(setErr(error.message));
      })
      .then(
        (res) => {
          if(res.ok)
            return res.json();
          else
            return Promise.reject(res);
      })
      .then(
        (json) => {
          if(shouldStart) {
            dispatch(initState(timer));
            dispatch(routeActions.push('/timers/session'));
          } else {
            dispatch(routeActions.push('/timers'));
            dispatch(openSnackbar('Timer created successfully'));
          }
          return Promise.resolve();
        })
        .catch(
        (res) => {
          console.log(res);
          if(res.status > 499) {
            dispatch(setErr('Server error.'));
            dispatch(routeActions.push('/500'));
          }
          if(res.status > 399 && res.status < 500) {
            res.json().then(
              (json) => {
                dispatch(setErr(json.errors));
              }
            );
          } else {
            dispatch(setErr('Unknown error.'));
          }
        }
      );
    }
  };
};

const CreateTimerPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTimer);

export default CreateTimerPage;
