import {
  SET_TIMERS_LIST,
  DELETE_TIMER
} from '../../actions/timer';

export default function timers(state = [], action) {
  switch(action.type) {
    case SET_TIMERS_LIST:
      return action.timers;
    case DELETE_TIMER:
      return state.filter((timer) => timer.id !== action.timer_id)
    default:
      return state;
  }
}
