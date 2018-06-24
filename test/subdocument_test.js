const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments',()=>{
  it('it can create a subdocument',(done)=>{
    const joe = new User({
      name: 'Joe',
      posts: [{title: 'PostTitle'}]
    });
    joe.save()
    .then(()=> User.findOne({name: 'Joe'}))
    .then((user)=>{
      assert(user.posts[0].title === 'PostTitle');
      done();
    });
  });

  it('Can add subdocuments to an already existing record',(done)=>{
    const archana = new User({name: 'Archana',posts: []});
    archana.save()
    .then(() => User.findOne({name: 'Archana'}))
    .then((user)=>{
      user.posts.push({title: 'NewPost'});
      return user.save();
    })
    .then(()=> User.findOne({name: 'Archana'}))
    .then((user)=>{
      assert(user.posts[0].title === 'NewPost');
      done();
    });
  });
  
  it('can remove an existing sub document',(done)=>{
    const archana = new User({
      name: 'Archana',
      posts: [{title: 'NewPost'}],
    });
    archana.save()
    .then((user)=>{
      const post = user.posts[0];
      post.remove();
      // removing sub-document doesnt automatically save, like removing
      // model instance does.So we have to save.
      return user.save();
    })
    .then(()=>User.findOne({name: 'Archana'}))
    .then((user)=>{
      assert(user.posts.length === 0);
      done();
    });
  });

});
