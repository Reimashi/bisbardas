var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var friendSchema = new Schema ({
  user:       { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  friend:     { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  acepted:    { type: Boolean, default: false, required: true },
  ignored:    { type: Boolean, default: false, required: true }
});

friendSchema.methods = {
    accept: function (cb) {
        this.acepted = true;
        this.save(cb);
    },
    ignore: function (cb) {
        this.ignored = true;
        this.save(cb);
    }
};

friendSchema.statics = {
    list: function (user, cb) {
      console.log("pasado: " + user);
        this.find({ user: user }).exec(cb);
    }
};

mongoose.model('Friend', friendSchema);

module.exports = function () {
    return mongoose.model('Friend');
};
