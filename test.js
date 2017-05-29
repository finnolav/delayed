var test = require('ava').test;
var delayedCall = require('./');

test.cb('should wait 1000ms and call the function with the payload supplied', t => {
  delayedCall.create(1000, function (count, message) {
    t.is(count, 50, 'count should be 50');
    t.is(message, 'hello', 'message should be hello');
    t.end();
  }, 50, 'hello');
});

test.cb('should work without a payload', t => {
  delayedCall.create(500, function () {
    t.end();
  });
});

test.cb('should handle this', t => {
  var me = this;
  delayedCall.create(500, (function () {
    t.is(this, me, 'handle this');
    t.end();
  }).bind(this));
});

test.cb('should handle this and payload', t => {
  var me = this;
  delayedCall.create(500, (function (arg1) {
    t.is(this, me, 'handle this');
    t.is(arg1, 'hello', 'message should be hello');
    t.end();
  }).bind(this), 'hello');
});

test.cb('should handle multiple delayed calls', t => {
  var count = 0;
  delayedCall.create(200, function () {
    count++;
  });
  delayedCall.create(600, function () {
    count++;
  });
  delayedCall.create(1000, function () {
    count++;
    t.is(count, 3);
    t.end();
  });
});
