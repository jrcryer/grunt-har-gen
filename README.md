# grunt-har-gen [![Build Status](https://travis-ci.org/jrcryer/grunt-har-gen.png?branch=master)](https://travis-ci.org/jrcryer/grunt-har-gen)

> Grunt plugin for generating HAR files from a series of URLs

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-har-gen --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-har-gen');
```

## The "hargen" task

### Overview
In your project's Gruntfile, add a section named `hargen` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  hargen: {
    options: {
      urls: {
        'google_com.har': 'http://www.google.com',
      },
      output: './tmp/test'
    },
    your_target: {
      urls: {
        'google_com.har': 'http://www.google.com',
        'google_fr.har': 'http://www.google.fr',
        'google_com.har': 'http://www.google.com'
      },
      output: './tmp/test'
    },
  },
})
```

### Options

#### options.urls
Type: `Object`
Default value: `{}`

An object that represents a hash of filenames and URLs.  The object keys is the filenames.  The object values are the URLs.

#### options.output
Type: `String`
Default value: `'./tmp'`

A string for the path to the folder that the HAR files will be generated.

### Usage Examples

#### Default Options
In this example, the default options are used to generate HAR files in the `tmp` folder

```js
grunt.initConfig({
  hargen: {
    options: {
      urls: {
        'google_com.har': 'http://www.google.com',
      },
    }
  },
})
```

#### Setting the output 
In this example, options are used to generate HAR files in the `./performance/reports` folder

```js
grunt.initConfig({
  hargen: {
    options: {
      urls: {
        'google_uk.har': 'http://www.gogle.co.uk',
        'google_fr.har': 'http://www.google.fr',
        'google_com.har': 'http://www.google.com'
      },
      output: './performance/reports'
    }
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
