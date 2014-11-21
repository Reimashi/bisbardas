var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var friendSchema = new Schema ({
  user:       { type: Schema.Types.ObjectId, required: true, ref = 'User' },
  friend:     { type: Schema.Types.ObjectId, required: true, ref = 'User' },
  acepted:    { type: Boolean, default: false, required: true },
  ignored:    { type: Boolean, default: false, required: true }
});

postSchema.methods = {
    accept: function (cb) {
        this.acepted = true;
        this.save(cb);
    },
    ignore: function (cb) {
        this.ignored = true;
        this.save(cb);
    }
}

postSchema.statics = {
    list: function (user, cb) {
        this.find({ user: user._id }).exec(cb);
    }
}

mongoose.model('Friend', friendSchema);
