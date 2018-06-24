const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post');

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: "Name must be longer than 2 characters"
    },
    required: [true, 'Name is required'],

  },
  posts: [PostSchema]
});

UserSchema.virtual('postCount').get(function(){
    return this.posts.length;
});


const User = mongoose.model('user',UserSchema);

// string 'user' is what controls what the
// collection is called in the mongoose side of things.
// step 9 assigns the value of 'user' with
// schema as set by userSchema to the model name User


module.exports = User;
