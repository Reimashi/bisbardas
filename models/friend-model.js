var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var friendSchema = new Schema ({
  user:       { type: Schema.Types.ObjectId, required: true },
  friend:     { type: Schema.Types.ObjectId, required: true },
  acepted:    { type: Boolean, default: false, required: true },
  ignored:    { type: Boolean, default: false, required: true }
});
