const expect = require('chai').expect;
const delayed = require('./');

describe('delayed', () => {
  it('should wait 1000ms and call the function with the payload supplied:', done => {
    delayed.create(1000, payload => {
      expect(payload.message).to.equal('Yes!');
      done();
    }, {message: 'Yes!'});
  });
});
