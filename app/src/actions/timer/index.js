export const ADD_INTERVAL = 'ADD_INTERVAL';
export const REMOVE_INTERVAL = 'REMOVE_INTERVAL';
export const SET_TIMER_NAME = 'SET_TIMER_NAME';

export function addInterval(interval) {
  return {
    type: ADD_INTERVAL,
    interval
  };
}

export function removeInterval(index) {
  return {
    type: REMOVE_INTERVAL,
    index
  };
}

export function setTimerName(name) {
  return {
    type: SET_TIMER_NAME,
    name
  };
}
