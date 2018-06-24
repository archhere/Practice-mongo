const assert = require('assert');
const User = require('../src/user');

describe('Virtual Types',()=>{
  it('postCount returns no of posts',(done)=>{
    const archana = new User({
      name: 'Archana',
      posts: [{title: 'newPost'}],
    });
    archana.save()
    .then(()=>User.findOne({name: 'Archana'}))
    .then((user)=>{
      assert(archana.postCount === 1);
      done();
    });
  });
});
