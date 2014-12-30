/*
 * grunt-har-gen
 * https://github.com/james/grunt-har-gen
 *
 * Copyright (c) 2013 James Cryer
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  var _ = require('lodash'),
      async = require('async'),
      exec = require('child_process').execFile,
      path = require('path'),
      phantomjs = require('phantomjs'),
      asset = path.join.bind(null, __dirname, '..'),
      netsniff = asset('lib/netsniff.js');

  grunt.registerMultiTask('hargen', 'Grunt plugin for generating HAR files from a series of URLs', function () {

    var options = this.options({
          urls:          {},
          output:        './tmp'
        }),
        urls = _.pairs(options.urls),
        dir = options.output,
        done = this.async();

    async.forEachSeries(urls, function (pair, next) {
      var filename = pair[0],
          url = pair[1];

      grunt.log.writeln('Trying: ' + url);

      exec(phantomjs.path, [netsniff, url], {maxBuffer: 1024 * 1024}, function (err, stdout, stderr) {
        if (err) {
          grunt.log.errorlns('Failed to connect to: ' + url);
          grunt.verbose.writeln(stderr);
        } else {
          grunt.log.writeln('Saving results to: ' + dir + '/' + filename);
          grunt.file.write(dir + '/' + filename, stdout);
        }

        next();
      });
    }, done);

    if (0 === urls.length) {
      grunt.log.error('No urls specified');
      done(false);
    }
  });
};
