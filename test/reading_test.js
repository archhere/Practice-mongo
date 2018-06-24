const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of database',()=>{
  let archana;
  beforeEach((done)=>{
    archana = new User({name: 'Archana'});
    archana.save().then(()=>done());
  });
  it('find all users with the name archana',(done)=>{
    User.find({name: 'Archana'}).then((users)=>{
      // console.log(users[0]._id,archana._id);
      assert(users[0]._id.toString() === archana._id.toString());
      done();
    });
  });
  it('finds one user with a particular id',(done)=>{
    User.findOne({_id: archana._id}).then((user)=>{
      assert(user.name === 'Archana');
      done();
    });
  });
});
