import {
  ADD_ROUND,
  REMOVE_ROUND,
  SET_TYPE,
  SET_REPEAT
} from '../../actions/timer/interval';
import {
  SET_COLOR,
  SET_DURATION,
  SET_ROUND_NAME
} from '../../actions/timer/round';
import roundReducer from './round';

const initialState = {
  type: '',
  repeat: 1,
  rounds: [roundReducer(undefined,{})],
};

export default function intervalReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_ROUND:
      const round = action.round || roundReducer(undefined, {});
      return {
        ...state,
        rounds: state.rounds.concat(round)
      };
    case REMOVE_ROUND:
      return {
        ...state,
        rounds: state.rounds.filter((_, i) => i !== action.roundIndex)
      };
    case SET_TYPE:
      return {
        ...state,
        type: action.intervalType
      };
    case SET_REPEAT:
      return {
        ...state,
        repeat: action.repeat
      };
    case SET_COLOR:
    case SET_ROUND_NAME:
    case SET_DURATION:
      return {
        ...state,
        rounds: state.rounds.map((round, j) => {
          if(j === action.roundIndex) {
            return roundReducer(round, action);
          }
          return round;
        })
      };
    default:
      return state;
  }
}
