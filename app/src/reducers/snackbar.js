import {
  OPEN_SNACKBAR,
  CLOSE_SNACKBAR
} from '../actions/snackbar';

export default function snackbar(state = { isOpen: false, message: '' }, action) {
  switch(action.type) {
    case OPEN_SNACKBAR:
      return {
        isOpen: true,
        message: action.message
      };
    case CLOSE_SNACKBAR:
      return {
        isOpen: false,
        message: ''
      };
    default:
      return state;
  }
}
