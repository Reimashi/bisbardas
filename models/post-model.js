var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var postSchema = new Schema ({
  title:      { type: String, required: true },
  body:       { type: String, required: true },
  author:     { type: Schema.Types.ObjectId, ref: 'User' },
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
        var index = utils.indexof(this.likes, { user: user._id });

        if (~index) return cb('Este usuario ya le habia dado a like.');
        else {
            this.likes.push({
                user: user._id
            });
            this.save(cb);
        }
    },

    deleteLike:function (user, cb) {
        var index = utils.indexof(this.likes, { user: user._id });

        if (~index) this.comments.splice(index, 1);
        else return cb('Este usuario no le habia dado a like.');
        this.save(cb);
    }
}

postSchema.statics = {
    list: function (limit, step, cb) {
        this.find({})
            .limit(limit)
            .sort({'createdAt': -1})
            .skip(limit * step)
            .exec(cb);
    }
}

mongoose.model('Post', postSchema);

module.exports = function () {
    return mongoose.model('Post');
}
