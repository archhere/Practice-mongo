const assert = require('assert');
const User = require('../src/user');

describe('Validating records',()=>{
  it('requires username',()=>{
    const user = new User({name: undefined});
    const validationResult = user.validateSync();
    // diffirence between validate and validateSync is,
    // the latter is a synchronous operation.Validate is asynchronous
    // console.log("This is validation error",validationResult);
    // const message = validationResult.errors.name.message;
    const {message} = validationResult.errors.name;

    // same syntax as the above commented out one
    assert(message === "Name is required");
  });

  it('requires user\'s name longer than 2 characters',()=>{
    const user = new User({name: 'Al'});
    const validationResult = user.validateSync();
    const {message} = validationResult.errors.name;
    assert(message === 'Name must be longer than 2 characters');
  });

  it('disallows invalid record from being saved',(done)=>{
    const user = new User({name: 'Al'});
    user.save()
    .catch((validationResult)=>{
      const {message} = validationResult.errors.name;
      assert(message === 'Name must be longer than 2 characters');
      done();
    });
  });
});
