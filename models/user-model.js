var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var userSchema = new Schema ({
  email: {
    type: String,
    index: { unique: true }, required: true,
    lowercase: true, trim: true,
    match: [ /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, "Invalid Email" ]
  },
  name: {
    first:      { type: String },
    last:       { type: String }
  },
  password:   { type: String, required: true },
  registered: { type: Date, default: Date.now, required: true }
});

userSchema.virtual('name.full').get(function () {
  return this.name.first + ' ' + this.name.last;
});

userSchema.path('email').validate(function(value, done) {
    this.model('User').count({ email: value }, function(err, count) {
        if (err) {
            return done(err);
        }
        done(!count);
    });
}, 'Email already exists');

mongoose.model('User', userSchema);

module.exports = function () {
    return mongoose.model('User');
}
