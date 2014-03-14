'use strict';

var r = require('..'),
	assert = require('assert');

describe('koa-r', function () {
  before(function () {
    r.set('first', require('./test/first'));
    r.set('second', require('./test/second'));
  });

  it('should find first.fn', function () {
    r('first', 'fn').should.be.ok;
  });

  it('should find second.fn', function () {
    r('second', 'fn').should.be.ok;
  });

  it('should throw error', function () {
    assert.throws(r('first', 'fnn'), Error);
  });

  describe('calculating', function () {
    it('should return 2', function () {
      r('first', 'fn')(1).should.be.exactly(2);
    });

    it('should return 3', function () {
      r('second', 'fn')(1).should.be.exactly(3);
    });
  });
});
