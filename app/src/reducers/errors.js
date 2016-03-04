import {
  SET_ERR,
  CLEAR_ERR
} from '../actions/errors';

export default function errors(state = [], action) {
  switch(action.type) {
    case SET_ERR:
      return action.errors;
    case CLEAR_ERR:
      return [];
    default:
      return state;
  }
}
