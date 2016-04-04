export const ADD_INTERVAL = 'ADD_INTERVAL';
export const REMOVE_INTERVAL = 'REMOVE_INTERVAL';
export const SET_TIMER_NAME = 'SET_TIMER_NAME';
export const INIT_NEW_TIMER = 'INIT_NEW_TIMER';

export function addInterval(interval) {
  return {
    type: ADD_INTERVAL,
    interval
  };
}

export function initNewTimer(timer) {
  return {
    type: INIT_NEW_TIMER,
    timer
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
