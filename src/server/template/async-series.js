/* console.log('Program Start');

var async = require('async');

async.series([
    function(callback) {
        // do some stuff ...
        callback(null, 'one');
    },
    function(callback) {
        // do some more stuff ...
        callback(null, 'two');
    }
],
// optional callback
function(err, results) {
    // results is now equal to ['one', 'two']
});

async.series({
    one: function(callback) {
        setTimeout(function() {
            callback(null, 1);
        }, 200);
    },
    two: function(callback){
        setTimeout(function() {
            callback(null, 2);
        }, 100);
    }
}, function(err, results) {
    // results is now equal to: {one: 1, two: 2}
});


async.series([
    function(callback) {
        var total = 0, count = 1;
        while (count <= 10) {
        total += count;
        count += 1;
        }

        var total = 0, count = 1;
        while (count <= 10) {
        total += count;
        count += 1;
        }

        var result = 1;
        var counter = 0;
        while (counter < 10) {
        result = result * 2;
        counter = counter + 1;
        }
        console.log(result);

        for (var number = 0; number <= 12; number = number + 2)
        console.log(number);

        var result = 1;
        for (var counter = 0; counter < 10; counter = counter + 1)
        result = result * 2;
        console.log(result);

        for (var number = 0; number <= 12; number += 2)
        console.log(number);

    //   counter++ and counter- -.
        // .

        // do some stuff ...
        callback(null, 'one');
    },
    function(callback) {
        // do some more stuff ...
        callback(null, 'two');
    }
],
// optional callback
function(err, results) {
    // results is now equal to ['one', 'two']
});
*/
/*
async.series({

},

function (err, results) {

  if (err) {
    console.log("Errors = ");
    throw (err);
  } else {
    console.log("Results = ");
    console.log(results);
  }
  process.exit(0);
});
*/
