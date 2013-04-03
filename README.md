# grunt-vlt

> Plugin for auto commiting, deleting and adding files from grunt-regarde into CQ's Filevault(VLT)

## Getting Started
This plugin requires Grunt `~0.4.1` && [Grunt Regarde](https://github.com/yeoman/grunt-regarde)

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-vlt --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-vlt');
```

## The "vlt" task

### Overview
In your project's Gruntfile, add a section named `vlt` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  vlt: {
    options: {
      flags: ['-v', '--force'] // optional flags to send to VLT 
    }
    ui: {
      cwd: 'ui/src/main/content/jcr_root/' // path to current working directory to run VLT commands from
    },
  },
})
```

### Options

#### options.flags
Type: `Array`
Default value: `[]`

The optional flags to send to VLT adds, commits and deletes

### Usage Examples

#### Default Options
In this example, regarde is listening for file changes and once detected triggering VLT and passing the changed file(s).

```js

grunt.initConfig({
  // regarde does the actual file watching emitting change notifications that VLT picks up
  regarde: {
    ui: {
      files: ['ui/src/main/content/jcr_root/**/*.{txt,css,js,jsp}'],
      tasks: ['vlt']
    }
  },
  // VLT then processes the change notifications updates CRX accordingly
  vlt: {
    options: {
      flags: ['-v', '--force'] // optional flags to send to VLT 
    },
    ui: {
      cwd: 'ui/src/main/content/jcr_root/' // path to current working directory to run VLT commands from
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
