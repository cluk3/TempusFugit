export const SET_COLOR = 'SET_COLOR';
export const SET_DURATION = 'SET_DURATION';
export const SET_ROUND_NAME = 'SET_ROUND_NAME';

export function setColor(color, intervalIndex, roundIndex) {
  return {
    type: SET_COLOR,
    color: color,
    intervalIndex,
    roundIndex
  };
}

export function setDuration(duration, intervalIndex, roundIndex) {
  return {
    type: SET_DURATION,
    duration,
    intervalIndex,
    roundIndex
  };
}

export function setRoundName(name, intervalIndex, roundIndex) {
  return {
    type: SET_ROUND_NAME,
    name,
    intervalIndex,
    roundIndex
  };
}
