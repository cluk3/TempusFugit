import {
  ADD_INTERVAL,
  REMOVE_INTERVAL,
  SET_TIMER_NAME
} from '../../actions/timer/newTimer';
import {
  ADD_ROUND,
  REMOVE_ROUND,
  SET_TYPE,
  SET_REPEAT
} from '../../actions/timer/interval';
import {
  SET_COLOR,
  SET_DURATION,
  SET_ROUND_NAME
} from '../../actions/timer/round';
import roundReducer from './round';
import intervalReducer from './interval';

const initialState = {
  name: 'MyNewTimer',
  intervals: [intervalReducer(undefined,{})]
};

export default function newTimer(state = initialState, action) {
  switch(action.type) {
    case ADD_INTERVAL:
      const interval = action.interval || intervalReducer(undefined, {});
      return {
        ...state,
        intervals: state.intervals.concat(interval)
      };
    case REMOVE_INTERVAL:
      return {
        ...state,
        intervals: state.intervals.filter((_, i) => i !== action.index)
      };
    case SET_TIMER_NAME:
      return {
        ...state,
        name: action.name
      };
    case ADD_ROUND:
    case REMOVE_ROUND:
    case SET_TYPE:
    case SET_REPEAT:
    case SET_COLOR:
    case SET_ROUND_NAME:
    case SET_DURATION:
      return {
        ...state,
        intervals: state.intervals.map((interval, i) => {
          if(i === action.intervalIndex) {
            return intervalReducer(interval, action);
          }
          return interval;
        })
      };
    default:
      return state;
  }
}

export function getTotalTime(state) {
  return state.intervals
    .map((interval) => interval.rounds.reduce((prev,curr) => prev+curr.duration, 0) * interval.repeat)
    .reduce((prev,curr) => prev + curr, 0);
}

export function getTimeline(state) {
  return state.intervals
    .map((interval) => {
      let rounds = [];
      for(let i = 0; i < interval.repeat; i++)
        rounds = rounds.concat(interval.rounds);
      return rounds;
    })
    .reduce((prev,curr) => prev.concat(curr), []);
}
