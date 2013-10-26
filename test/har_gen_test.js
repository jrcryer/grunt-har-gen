'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.har_gen = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(1);

    var actual = grunt.file.readJSON('tmp/google_com.har').log.pages.length;
    var expected = 1;
    test.equal(actual, expected, 'should have a page');

    test.done();
  },
  output_options: function(test) {
    test.expect(1);

    var actual   = grunt.file.readJSON('tmp/test/google_com.har').log.pages.length;
    var expected = 1;
    test.equal(actual, expected, 'should have a page in specific directory');

    test.done();
  },
  multiple_options: function(test) {
    test.expect(1);

    var actual = grunt.file.expand('tmp/multiple/*.har').length;
    var expected = 3;
    test.equal(actual, expected, 'should have multiple HAR files.');

    test.done();
  },
};
