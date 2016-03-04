import {
  SET_COLOR,
  SET_DURATION,
  SET_ROUND_NAME
} from '../actions/timer/round';

const initialState = {
  duration: 35,
  name: '',
  color: 'green',
};

export default function roundReducer(state = initialState, action) {
  switch(action.type) {
    case SET_ROUND_NAME:
      return {
        ...state,
        name: action.name
      };
    case SET_COLOR:
      return {
        ...state,
        color: action.color
      };
    case SET_DURATION:
      return {
        ...state,
        duration: action.duration
      };
    default:
      return state;
  }
}
