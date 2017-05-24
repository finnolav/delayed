var expect = require('chai').expect;
var delayedCall = require('./');
var globalthis = this;
describe('delayed-call', function() {
  it('should wait 1000ms and call the function with the payload supplied', function(done) {
    var me = this;
    delayedCall.create(1000, (count, message) => {
      expect(count).to.equal(50);
      expect(message).to.equal('hello');
      done();
    }, 50, 'hello');
  });

  it('should work without a payload', function(done) {
    delayedCall.create(500, () => {
      done();
    });
  });

  it('should handle this', function(done) {
    var me = this;
    delayedCall.create(500, () => {
      expect(me).to.equal(this);
      done();
    });
  });

  it('should handle this and payload', function(done) {
    var me = this;
    delayedCall.create(500, () => {
      expect(me).to.equal(this);
      done();
    }, "hello");
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
