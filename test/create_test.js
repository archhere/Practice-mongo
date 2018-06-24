const assert = require('assert');
const User = require('../src/user');

describe('Creating records',()=>{
  it('saves a user',(done)=>{
    const archana = new User({name: 'Archana'});

    // the save call takes some time, and so is asynchronous in nature,
    // so we need a call back or a promise.
    // If we reference done above, we do have to use it below as a callback.
    // or a promise

    archana.save().then(()=>{
      assert(!archana.isNew);
      done();
    });
  });
});
