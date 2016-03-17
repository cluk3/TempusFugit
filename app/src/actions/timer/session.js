import { getTotalTime, getTimeline } from '../../reducers/timers/newTimer';

export const PAUSE_SESSION = 'PAUSE_SESSION';
export const START_SESSION = 'START_SESSION';
export const NEXT_ROUND = 'NEXT_ROUND';
export const PREV_ROUND = 'PREV_ROUND';
export const RESET_TIMER = 'RESET_TIMER';
export const RESET_ROUND = 'RESET_ROUND';
export const TICK = 'TICK';
export const INIT_STATE = 'INIT_STATE';
export const GO_TO_ROUND = 'GO_TO_ROUND';

export function pauseSession() {
  return {
    type: PAUSE_SESSION,
    pauseTimer: true
  };
}

export function startSession() {
  return {
    type: START_SESSION,
  };
}

export function nextRound() {
  return {
    type: NEXT_ROUND,
    pauseTimer: true,
  };
}

export function goToRound(roundNumber) {
  return {
    type: GO_TO_ROUND,
    pauseTimer: true,
    roundNumber
  };
}

export function prevRound() {
  return {
    type: PREV_ROUND,
    pauseTimer: true,
  };
}

export function resetTimer() {
  return {
    type: RESET_TIMER,
    pauseTimer: true,
  };
}

export function resetRound() {
  return {
    type: RESET_ROUND,
    pauseTimer: true,
  };
}

export function tick() {
  return {
    type: TICK,
  };
}

export function initState(timer) {
  const timeline = getTimeline(timer);
  const state = {
    totalElapsed: 0,
    totalRemaining: getTotalTime(timer),
    roundElapsed: 0,
    roundRemaining: timeline[0].duration,
    timeline,
    active: 0,
    activeColor: timeline[0].color,
    paused: true
  };
  return {
    type: INIT_STATE,
    pauseTimer: true,
    state
  };
}

let idInt;

export const clockMiddleware = store => next => action => {
  if(action.type === START_SESSION) {
    clearInterval(idInt);
    idInt = setInterval(function() {
      store.dispatch(tick());
    },984); // let's assume we are at 60 fps and the browser lose 16ms re rendering
  } else if(action.pauseTimer) {
    clearInterval(idInt);
  }
  next(action);
};
