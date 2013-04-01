/*
 * grunt-vlt
 * https://github.com/eric.clifford/grunt-vlt
 *
 * Copyright (c) 2013 Eric Clifford
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var spawn = function(cmd, args, opts, callback) {
    grunt.util.spawn({
      cmd: cmd,
      args: args,
      opts: opts
    }, function(error, result, code) {
      if (error) {
        grunt.log.error(String(error));
      }
      if (result) {
        grunt.log.writeln(String(result));
      }
      if (code) {
        grunt.log.error(String(code));
      }
      if(callback) {
        callback();
      }
    });
  };

  grunt.registerMultiTask('vlt', 'simple vlt task', function() {
    var cwd = this.data.cwd;

    grunt.event.on('regarde:file', function(status, target, filepath){
      // get path relative to current working directory
      var relativeFilePath = filepath.replace(cwd, '');

      if(status === 'changed') {
        grunt.log.writeln('detected changed filed ' + relativeFilePath);
        spawn('vlt', ['commit', '--force', relativeFilePath], {cwd: cwd});
      } else if(status === 'added') {
        grunt.log.writeln('detected new filed');
        spawn('vlt', ['add', relativeFilePath], {cwd: cwd}, function() {
          spawn('vlt', ['commit', '--force', relativeFilePath], {cwd: cwd});
        });
      } else if(status === 'deleted') {
        grunt.log.writeln('detected deleted filed');
        spawn('vlt', ['delete', relativeFilePath], {cwd: cwd}, function() {
          spawn('vlt', ['commit', '--force', relativeFilePath], {cwd: cwd});
        });
      }
    }); 
  });
};
