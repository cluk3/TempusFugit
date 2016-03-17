import { connect } from 'react-redux';
import {
  nextRound,
  prevRound,
  resetTimer,
  resetRound,
  tick,
  goToRound,
  startSession,
  pauseSession
} from '../actions/timer/session';
import TimerSession from '../components/timers/TimerSession';

const mapStateToProps = (state, ownProps) => {
  const session = state.timerSession;
  return {
    totalElapsed: session.totalElapsed,
    totalRemaining: session.totalRemaining,
    roundElapsed: session.roundElapsed,
    roundRemaining: session.roundRemaining,
    timeline: session.timeline,
    active: session.active,
    activeColor: session.activeColor,
    paused: session.paused,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    pauseSession: () => dispatch(pauseSession()),
    startSession: () => dispatch(startSession()),
    nextRound: () => dispatch(nextRound()),
    prevRound: () => dispatch(prevRound()),
    resetTimer: () => dispatch(resetTimer()),
    resetRound: () => dispatch(resetRound()),
    tick: () => dispatch(tick()),
    goToRound: (roundNumber) => dispatch(goToRound(roundNumber))
  };
};

const TimerSessionPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TimerSession);

export default TimerSessionPage;
