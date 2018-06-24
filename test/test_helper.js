const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// global.Promise is reference to es6 promise

// difference between before and beforeEach is, before is only executed once

before((done)=>{

  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection
  .once('open',() => {
    done();
  })
  .on('error',(error)=>{
    console.warn('Warning',error);
  });

});

beforeEach((done) => {
  mongoose.connection.collections.users.drop(()=> {
    // Ready to run the next test.Done is an asynchrous function
    // provided by mocha to ensure that only when the old users
    // are dropped, do we start the new test

    done();

  });
});
