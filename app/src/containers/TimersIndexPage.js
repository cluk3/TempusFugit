import { connect } from 'react-redux';
import {
  setTimersList,
  deleteTimer
} from '../actions/timer';
import TimersIndex from '../components/timers/TimersIndex';
import { routeActions } from 'react-router-redux';
import { setErr } from '../actions/errors';
import config from '../../../config';
import { initState } from '../actions/timer/session';

const mapStateToProps = (state, ownProps) => {
  return {
    timers: state.timers
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteTimer: (id) => {
      dispatch(deleteTimer(id));
      const fetchOpts =  {
        method: 'delete',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };

      return fetch(config.app.host + '/api/timers/'+ id, fetchOpts)
        .catch( (error) => {
          dispatch(setErr(error.message));
        })
        .then(
          (res) => {
            if(res.ok)
              dispatch(deleteTimer(id));
            else
              return Promise.reject(res);
        })
        .catch(
          (res) => {
          if(res.status > 499) {
            dispatch(setErr('Server error.'));
            dispatch(routeActions.push('/500'));
          } else {
            dispatch(setErr('Fetching error. Code: '+res.status));
          }
        }
      );
    },
    startSession: (timer) => {
      dispatch(initState(timer));
      dispatch(routeActions.push('/timers/session'));
    },
    fetchTimers: () => {
      const fetchOpts =  {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };

      return fetch(config.app.host + '/api/alltimers', fetchOpts)
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
            dispatch(setTimersList(json.data));
            return Promise.resolve();
        })
        .catch(
          (res) => {
          if(res.status > 499) {
            dispatch(setErr('Server error.'));
            dispatch(routeActions.push('/500'));
          } else {
            dispatch(setErr('Fetching error. Code: '+res.status));
          }
        }
      );
    }
  };
};

const TimersIndexPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TimersIndex);

export default TimersIndexPage;
