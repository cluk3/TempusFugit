import Timer from '../models/timer';
import Interval from '../models/interval';
import config from '../../../config';

exports.timersCreate = function *() {
  let result = { errors: [] };
  if (!this.request.body) {
    this.status = 400;
    result.errors.push('The body is empty');
    return this.body = result;
  }

  try {
    let intervals = this.request.body.intervals.map((interval) => {
      return new Interval({
        type: interval.type,
        repeat: interval.repeat,
        rounds: interval.rounds,
        user_id: this.request.body.user_id
      }).save();
    });
    intervals = yield Promise.all(intervals);
    const interval_ids = intervals.map((interval) => interval._id);
    var timer = new Timer({
      name: this.request.body.name,
      intervals: interval_ids,
      user_id: this.request.body.user_id
    });
    timer = yield timer.save();
    this.status = 201;

    this.body = {
      data: serializeTimer(timer, intervals)
    };

  } catch (err) {
    if(err.name === 'ValidationError') {
      this.status = 422;
      Object.keys(err.errors).forEach((key) => {
        result.errors.push(err.errors[key].message);
      });
      if(err.code === 11000) {
        this.status = 409;
        result.errors.push('The timer name already exists');
        return this.body = result;
      }
      return this.body = result;
    }
    this.throw(err, 500);
  }
};

exports.timersIndex = function* () {
  const timers = yield Timer.find().populate('intervals');
  return this.body = {
    data: serializeTimers(timers)
  };
};

exports.timersByCurrentUser = function* () {
  const timers = yield Timer.find({
    user_id: this.state.user.id
  }).populate('intervals');
  return this.body = {
    data: serializeTimers(timers)
  };
};

exports.timersById = function* (timer_id) {
  const timer = yield Timer.findById(timer_id).populate('intervals');
  return this.body = {
    data: serializeTimer(timer, timer.intervals)
  };
};

exports.timersDelete = function* (timer_id) {
  const timer = yield Timer.findByIdAndRemove(timer_id);
  const intervals = timer.intervals.map((interval) => {
    return Interval.findByIdAndRemove(interval._id);
  });
  yield Promise.all(intervals);
  return this.body = {
    meta: 'Timer removed successfully'
  };
};

function serializeTimers(timers) {
  return timers.map((timer) => {
    return {
      id: timer._id,
      name: timer.name,
      intervals: timer.intervals.map((interval) => {
        return {
          id: interval._id,
          type: interval.type,
          repeat: interval.repeat,
          rounds: interval.rounds
        };
      })
    };
  });
}

function serializeTimer(timer, intervals) {
  return {
    id: timer._id,
    name: timer.name,
    intervals: intervals.map((interval) => {
      return {
        id: interval._id,
        type: interval.type,
        repeat: interval.repeat,
        rounds: interval.rounds,
      };
    })
  };
}
