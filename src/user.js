const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  postCount: Number
});


const User = mongoose.model('user',userSchema);

// string 'user' is what controls what the
// collection is called in the mongoose side of things.
// step 9 assigns the value of 'user' with
// schema as set by userSchema to the model name User


module.exports = User;
