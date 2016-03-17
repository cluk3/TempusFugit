var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RoundSchema = new Schema({
  name: { type: String, required: true},
  duration: {type: Number, required: true, min: 1},
  color: {type: String, required: true, default: '#00CA4B'}
});

var IntervalSchema = new Schema({
  type: { type: String },
  repeat: { type: Number, min: 1, default: 1},
  rounds: [RoundSchema],
  user_id: {type: Schema.Types.ObjectId, ref: 'User' }
},{timestamps: true});

IntervalSchema.path('rounds').validate(function(value) {
  return value.length;
},"You must create at least one round");

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
export default mongoose.model("Interval", IntervalSchema);
