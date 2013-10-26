/*
 * grunt-har-gen
 * https://github.com/james/grunt-har-gen
 *
 * Copyright (c) 2013 James Cryer
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    hargen: {
      default_options: {
        options: {
          urls: {
            'google_com.har': 'http://www.google.com',
          }
        }
      },
      path_options: {
        options: {
          urls: {
            'google_com.har': 'http://www.google.com',
          },
          output: './tmp/test'
        }
      },
      multiple_urls_options: {
        options: {
          urls: {
            'google_uk.har': 'http://www.gogle.co.uk',
            'google_fr.har': 'http://www.google.fr',
            'google_com.har': 'http://www.google.com',
          },
          output: './tmp/multiple'
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'hargen', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
