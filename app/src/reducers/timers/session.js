import {
  PAUSE_SESSION,
  START_SESSION,
  NEXT_ROUND,
  PREV_ROUND,
  RESET_TIMER,
  RESET_ROUND,
  TICK,
  INIT_STATE,
  GO_TO_ROUND
} from '../../actions/timer/session';

// Actions: Pause, skip round, reset timer, reset round
const initialState = {
  totalElapsed: 0, //number of seconds
  totalRemaining: 150,
  roundElapsed: 0,
  roundRemaining: 30,
  //fullscreen: false,
  //distractionFree: true,
  timeline: [
    {duration:30, color: '#00CA4B', name: 'Round 1'},
    {duration:45, color: '#FF8500', name: 'Round 2'},
    {duration:30, color: '#3F09C2', name: 'Round 3'},
    {duration:45, color: '#F4C900', name: 'Round 4'},
    {duration:45, color: '#8603AB', name: 'Round 5'},
  ],
  active: 0, //timeline index
  activeColor: '#00CA4B',
  paused: true
};

export default function timerSession(state = initialState, action) {
  const {
    totalElapsed,
    totalRemaining,
    roundElapsed,
    roundRemaining,
    timeline,
    active,
    paused
  } = state;
  const getRemaining = (i) => timeline.slice(i).reduce((prev,curr) => prev+curr.duration, 0);
  switch(action.type) {
    case INIT_STATE:
      return action.state;
    case START_SESSION:
      return {
        ...state,
        paused: false
      };
    case PAUSE_SESSION:
      return {
        ...state,
        paused: true
      };
    case TICK:
      if(paused)
        return state
      if(roundRemaining > 0) {
        return {
          ...state,
          totalElapsed: totalElapsed + 1,
          roundElapsed: roundElapsed + 1,
          roundRemaining: roundRemaining - 1,
          totalRemaining: totalRemaining - 1
        }
      } else {
        if(active < timeline.length-1) {
          return {
            ...state,
            active: active + 1,
            roundElapsed: 0,
            roundRemaining: timeline[active + 1].duration,
            activeColor:timeline[active + 1].color,
            totalRemaining: getRemaining(active+1),
          };
        } else {
          return {
            ...state,
            paused: true
          }
        }
      }
    case NEXT_ROUND:
      if(active < timeline.length-1) {
        return {
          ...state,
          active: active + 1,
          roundElapsed: 0,
          roundRemaining: timeline[active + 1].duration,
          activeColor:timeline[active + 1].color,
          totalRemaining: getRemaining(active+1),
          paused: true
        };
      } else {
        return {
          ...state,
          roundElapsed: timeline[active].duration,
          roundRemaining: 0,
          totalRemaining: 0,
          paused: true
        }
      }
    case GO_TO_ROUND:
      if(action.roundNumber < timeline.length && action.roundNumber >= 0) {
        return {
          ...state,
          active: action.roundNumber,
          roundElapsed: 0,
          roundRemaining: timeline[action.roundNumber].duration,
          activeColor:timeline[action.roundNumber].color,
          totalRemaining: getRemaining(action.roundNumber),
          paused: true
        }
      }
      return state;
    case PREV_ROUND:
      if(active > 0) {
        return {
          ...state,
          active: active - 1,
          activeColor:timeline[active - 1].color,
          roundElapsed: 0,
          roundRemaining: timeline[active - 1].duration,
          totalRemaining: getRemaining(active - 1),
          paused: true
        };
      }
    case RESET_ROUND:
      return {
        ...state,
        roundElapsed: 0,
        roundRemaining: timeline[active].duration,
        totalRemaining: getRemaining(active),
        paused: true
      };
    case RESET_TIMER:
      return {
        timeline,
        active: 0,
        activeColor: timeline[0].color,
        roundElapsed: 0,
        roundRemaining: timeline[0].duration,
        totalElapsed: 0,
        totalRemaining: getRemaining(0),
        paused: true
      };
    default:
      return state;
  }
}
