/*
 * grunt-har-gen
 * https://github.com/james/grunt-har-gen
 *
 * Copyright (c) 2013 James Cryer
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var exec = require('child_process').exec,
      _ = grunt.util._;

  grunt.registerMultiTask('hargen', 'Grunt plugin for generating HAR files from a series of URLs', function() {

    var options = this.options({
      urls: {},
      output: './tmp'
    }),
    urls  = _.pairs(options.urls),
    count = urls.length,
    index = 0,
    dir   = options.output,
    done  = this.async();

    urls.forEach(function(pair) {
      var filename = _.head(pair);
      var url      = _.last(pair);

      var cmd = 'phantomjs node_modules/grunt-har-gen/tasks/lib/netsniff.js ' + url;
      grunt.log.writeln('Trying: ' + url);

      var cp = exec(cmd, {maxBuffer: 1024 * 1024}, function (err, stdout, stderr) {
        if (err) {
          grunt.log.errorlns('Failed to connect to: ' + url);
          grunt.verbose.writeln(stderr);
        }else {
          grunt.log.writeln('Saving results to: ' + dir + '/' + filename);
          grunt.file.write(dir + '/' + filename, stdout);
        }
        index++;

        if (index === count) {
          done();
        }
      });
    });
  });
};
