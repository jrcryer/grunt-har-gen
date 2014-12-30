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
      spawn = require('child_process').spawn,
      fs = require('fs'),
      path = require('path'),
      phantomjs = require('phantomjs'),
      asset = path.join.bind(null, __dirname, '..'),
      netsniff = asset('lib/netsniff.js');

  grunt.registerMultiTask(
    'hargen', 'Grunt plugin for generating HAR files from a series of URLs',
    function () {
      var options = this.options({
            urls:   {},
            output: './tmp',
            args: []
          }),
          urls = _.pairs(options.urls),
          dir = options.output,
          done = this.async();

      async.forEach(urls, function (pair, next) {
        var filename = pair[0],
            url = pair[1],
            args = options.args.concat([netsniff, url]);

        grunt.log.writeln('Trying: ' + url);

        var process = spawn(phantomjs.path, args, {
          stdio: [
            'ignore',
            fs.openSync(dir + '/' + filename, 'w'),
            'pipe'
          ]
        });

        process.on('close', function (code) {
          if (code !== 0) {
            grunt.log.errorlns('Failed to connect to: ' + url);
            next(code);
          } else {
            grunt.log.writeln('Saved results to: ' + dir + '/' + filename);
            next();
          }
        })
      }, function (err) {
        done(!err);
      });

      if (0 === urls.length) {
        grunt.log.error('No urls specified');
        done(false);
      }
    });
};
