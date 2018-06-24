const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user',()=>{
  let archana;
  beforeEach((done)=>{
    archana = new User({name: 'Archana'});
    archana.save().then(()=>done());
  });

  it('model instance remove',(done)=>{
    archana.remove()
    .then(()=>User.findOne({name: 'Archana'}))
    .then((user) => {
      assert(user === null);
      done();
    });

  });


  it('class method remove',(done)=>{
    // removes a bunch of records with same criterea
    User.remove({name: 'Archana'})
    .then(()=> User.findOne({name: 'Archana'}))
    .then((user)=> {
      assert(user === null);
      done();
    });
  });

  it('class method findOneAndRemove',(done)=>{
    User.findOneAndRemove({name: 'Archana'})
    .then(() => User.findOne({name: 'Archana'}))
    .then((user)=>{
      assert(user === null);
      done();
    });

  });

  it('class method findByIdAndRemove',(done)=>{
    User.findByIdAndRemove(archana._id)
      .then(() => User.findOne({name: 'Archana'}))
      .then((user)=>{
        assert(user === null);
        done();
      });
  });
});
