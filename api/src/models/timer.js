var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var co = require("co");

var TimerSchema = new Schema({
  name: { type: String, required: true, unique: true},
  intervals: [{type: Schema.Types.ObjectId, ref: 'Interval' }],
  user_id: {type: Schema.Types.ObjectId, ref: 'User' }
});

TimerSchema.path('intervals').validate(function(value) {
  return value.length;
},"You must create at least one interval");

/**
 * Middlewares
 */

/**
 * Methods
 */

/**
 * Statics
 */

// Model creation
export default mongoose.model("Timer", TimerSchema);
