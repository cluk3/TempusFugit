import bcrypt from "../../../lib/bcrypt-thunk"; // version that supports yields
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var co = require("co");

var UserSchema = new Schema({
  username: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
}, {
  toJSON: {
    transform: function(doc, ret, options) {
      delete ret.password;
    },
    timestamps: true
  },
});

/**
 * Middlewares
 */
 
UserSchema.pre("save", function(done) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) {
    return done();
  }

  co.wrap(function*() {
    try {
      var salt = yield bcrypt.genSalt();
      var hash = yield bcrypt.hash(this.password, salt);
      this.password = hash;
      done();
    } catch (err) {
      done(err);
    }
  }).call(this).then(done);
});

/**
 * Methods
 */
UserSchema.methods.comparePassword = function *(candidatePassword) {
  return yield bcrypt.compare(candidatePassword, this.password);
};

/**
 * Statics
 */

UserSchema.statics.passwordMatches = function *(username, password) {
  var user = yield this.findOne({ username: username.toLowerCase() }).exec();
  if (!user) {
    throw new Error("User not found");
  }

  if (yield user.comparePassword(password)) {
    return user;
  }

  throw new Error("Password does not match");
};

// Model creation
export default mongoose.model("User", UserSchema);
