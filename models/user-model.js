var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var userSchema = new Schema ({
  alias:      { type: String, index: true, required: true },
  email: {
    type: String,
    index: true, required: true,
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

mongoose.model('User', userSchema);
