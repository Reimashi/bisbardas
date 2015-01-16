var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var postSchema = new Schema ({
  title:      { type: String, required: true },
  body:       { type: String, required: true },
  author:     { type: Schema.Types.ObjectId, ref: 'User', required: true },
  img:        { type: String },
  createdAt:  { type : Date, default : Date.now },
  likes:      [{
      user:   { type: Schema.Types.ObjectId, ref: 'User' }
  }],
  comments:   [{
      body:         { type: String, required: true },
      user:         { type: Schema.Types.ObjectId, ref: 'User' },
      createdAt:    { type : Date, default : Date.now }
  }]
});

postSchema.methods = {
    addComment: function (user, comment, cb) {
        this.comments.push({
          body: comment,
          user: user._id
        });

        this.save(cb);
    },

    addLike: function (user, cb) {
      this.likes.push({
        user: user._id
      });
      this.save(cb);
    },

    deleteLike:function (user, cb) {
      var newlikes = Array();
      this.likes.forEach(function(like) {
        if (like.user != user._id) {
          newlikes.push;
        }
      });
      this.likes = newlikes;
      this.save();
    }
};

postSchema.statics = {
    list: function (user, limit, step, cb) {
        friendModel = mongoose.model('Friend');
        postModel = this;

        friendModel.find().or([{ user: user._id, userState: "accepted", friendState: "accepted" }, { friend: user._id, userState: "accepted", friendState: "accepted" }]).exec(function (err, friends) {
            var friendids = [];
            friendids.push(user._id);

            friends.forEach(function(friend) {
              if (friend.user == user._id) {
                friendids.push(friend.friend);
              }
              else {
                friendids.push(friend.user);
              }
            });

            postModel.find({})
                .where('author')
                .in(friendids)
                .limit(limit)
                .populate('author')
                .sort({'createdAt': -1})
                .skip(limit * step)
                .exec(cb);
        });
    }
};

mongoose.model('Post', postSchema);

module.exports = function () {
    return mongoose.model('Post');
};
