export const ADD_ROUND = 'ADD_ROUND';
export const REMOVE_ROUND = 'REMOVE_ROUND';
export const SET_TYPE = 'SET_TYPE';
export const SET_REPEAT = 'SET_REPEAT';

export function addRound(intervalIndex, round) {
  return {
    type: ADD_ROUND,
    round,
    intervalIndex
  };
}

export function removeRound(roundIndex, intervalIndex) {
  return {
    type: REMOVE_ROUND,
    roundIndex,
    intervalIndex
  };
}

export function setType(intervalType, intervalIndex) {
  return {
    type: SET_TYPE,
    intervalType,
    intervalIndex
  };
}

export function setRepeat(repeat, intervalIndex) {
  return {
    type: SET_REPEAT,
    repeat,
    intervalIndex
  };
}
