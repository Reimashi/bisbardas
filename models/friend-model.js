var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var friendSchema = new Schema ({
  user:         { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  friend:       { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  userState:    { type: String, default: "accepted", required: true, enum: ["accepted", "pending", "rejected"] },
  friendState:  { type: String, default: "pending", required: true, enum: ["accepted", "pending", "rejected"] }
});

friendSchema.methods = {
    accept: function (cb) {
      this.userState = "accepted";
      this.save(cb);
    },
    ignore: function (cb) {
      this.userState = "rejected";
      this.save(cb);
    }
};

friendSchema.statics = {

    listPending: function (user, cb) {
      this.find().or([{ user: user._id, userState: "pending" }, { friend: user._id, friendState: "pending" }]).populate('user').populate('friend').exec(cb);
    },

    listAccepted: function (user, cb) {
      this.find().or([{ user: user._id, userState: "accepted" }, { friend: user._id, friendState: "accepted" }]).populate('user').populate('friend').exec(cb);
    },

    listRejected: function (user, cb) {
      this.find().or([{ user: user._id, userState: "rejected" }, { friend: user._id, friendState: "rejected" }]).populate('user').populate('friend').exec(cb);
    },

    list: function (user, cb) {
      var self = this;
      var amigos = Array();
      self.listPending(user, function(err, amigosp) {
        if (err) { cb(err, amigosp); }
        else { amigos = amigos.concat(amigosp); }
        self.listAccepted(user, function(err, amigosa) {
          if (err) { cb(err, amigosa); }
          else { amigos = amigos.concat(amigosa); }
          self.listRejected(user, function(err, amigosr) {
            if (err) { cb(err, amigosr); }
            else { amigos = amigos.concat(amigosr); }
            cb(err, amigos);
          });
        });
      });
    }
};

mongoose.model('Friend', friendSchema);

module.exports = function () {
    return mongoose.model('Friend');
};
