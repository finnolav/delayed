var expect = require('chai').expect;
var delayedCall = require('./');

describe('delayed-call', function() {
  it('should wait 1000ms and call the function with the payload supplied', function(done) {
    delayedCall.create(1000, function(count, message) {
      expect(count).to.equal(50);
      expect(message).to.equal('hello');
      done();
    }, 50, 'hello');
  });

  it('should work without a payload', function(done) {
    delayedCall.create(500, function() {
      done();
    });
  });

  it('should handle this', function(done) {
    var me = this;
    delayedCall.create(500, (function() {
      expect(me).to.equal(this);
      done();
    }).bind(this));
  });

  it('should handle this and payload', function(done) {
    var me = this;
    delayedCall.create(500, (function(arg1) {
      expect(me).to.equal(this);
      expect(arg1).to.equal("hello");
      done();
    }).bind(this), "hello");
  });

  it('should handle bound function', function(done) {
    var me = this;
    delayedCall.create(500, (function() {
      expect(me).to.equal(this);
      done();
    }).bind(this));
  });

  it('should handle bound function and payload', function(done) {
    var me = this;
    delayedCall.create(500, (function() {
      expect(me).to.equal(this);
      done();
    }).bind(this), "hello");
  });

  it('should handle multiple delayed calls', function(done) {
    var count = 0;
    delayedCall.create(200, function() {
      count++;
    });
    delayedCall.create(600, function() {
      count++;
    });
    delayedCall.create(1000, function() {
      count++;
      expect(count).to.equal(3);
      done();
    });
  });
});
