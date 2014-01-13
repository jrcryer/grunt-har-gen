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
      path = require('path'),
      _ = grunt.util._,
      script  = path.resolve(path.resolve(__dirname, 'lib/netsniff.js'));

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

      var cmd = './node_modules/grunt-lib-phantomjs/node_modules/.bin/phantomjs ' + script + ' ' + url;
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

    if (0 === urls.length) {
      grunt.log.error('No urls specified');
      done(false);
    }
  });
};
