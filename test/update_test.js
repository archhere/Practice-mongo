const assert = require('assert');
const User = require('../src/user');

describe('Updating a record',()=>{
  let archana;
  beforeEach((done)=>{
    archana = new User({name: 'Archana',postCount: 0});
    archana.save().then(()=>done());
  });

  function assertName(updatedData,done){
    updatedData
    .then(()=> User.find({}))
    .then((users)=>{
      assert(users.length === 1);
      assert(users[0].name === 'Archana Kannan');
      done();
    });
  }

  it('instance type using set and save',(done) => {
    archana.set({name: 'Archana Kannan'});
    assertName(archana.save(),done);

  });

  it('A model instance can update ',(done)=>{
    assertName(archana.update({name: 'Archana Kannan'}),done);
  });

  it('A model class can update',(done)=>{
    let newUser = User.update({name: 'Archana'},{name: 'Archana Kannan'});
    assertName(newUser,done);
  });

  it('A model class can update one record',(done)=>{
    assertName(
    User.findOneAndUpdate({name: 'Archana'},{name: 'Archana Kannan'}),
    done
  );
  });

  it('A model class can find record by ID and update',(done)=>{
    assertName(
      User.findByIdAndUpdate(archana._id,{name: 'Archana Kannan'}),
      done
    );
  });

  it('A user can have their postcount incremented by 1',(done)=>{
      User.update({name: 'Archana'}, {$inc: {postCount: 1} })
      .then(()=>User.findOne({name: 'Archana'}))
      .then((user)=>{
        assert(user.postCount === 1);
        done();
      });
  });

});
