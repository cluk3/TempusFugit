import {
  LOGOUT_SUCCESS
} from '../actions/logout';
import {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE
} from '../actions/signin';
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE
} from '../actions/signup';

export default function auth(state = {
  isFetching: false,
  isAuthenticated: false,
  }, action) {
  const {isFetching, isAuthenticated, type, user} = action;
  switch (type) {
  case SIGNUP_REQUEST:
    return Object.assign({}, state, {
      isFetching,
      isAuthenticated
    });
  case SIGNUP_SUCCESS:
    return Object.assign({}, state, {
      isFetching,
      isAuthenticated,
      user
    });
  case SIGNUP_FAILURE:
    return Object.assign({}, state, {
      isFetching,
      isAuthenticated,
    });
  case SIGNIN_REQUEST:
    return Object.assign({}, state, {
      isFetching,
      isAuthenticated
    });
  case SIGNIN_SUCCESS:
    return Object.assign({}, state, {
      isFetching,
      isAuthenticated,
      user
    });
  case SIGNIN_FAILURE:
    return Object.assign({}, state, {
      isFetching,
      isAuthenticated,
    });
  case LOGOUT_SUCCESS:
    return {
      isAuthenticated
    };
  default:
    return state;
  }
}
