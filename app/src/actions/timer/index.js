export const SET_TIMERS_LIST = 'SET_TIMERS_LIST';
export const DELETE_TIMER = 'DELETE_TIMER';

export function setTimersList(timers) {
  return {
    type: SET_TIMERS_LIST,
    timers
  };
}

export function deleteTimer(id) {
  return {
    type: DELETE_TIMER,
    timer_id: id
  };
}
