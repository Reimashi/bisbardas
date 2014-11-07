var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var userSchema = new Schema ({
  _id:        { type: Schema.Types.ObjectId },
  title:      { type: String, required: true },
  body:       { type: String, required: true },
  likes:      { type: Number, min: 0, required: true }
});
