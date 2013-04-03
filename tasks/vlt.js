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
    var options = this.options({
      flags: []
    });

    if(!grunt.regarde.changed[0]) {
      return;
    }

    var cwd = this.data.cwd;
    var args = ['add', grunt.regarde.changed[0].replace(cwd, '')];

    // Does file still exist
    if(grunt.file.exists(grunt.regarde.changed[0])) {
      args = args.concat(options.flags);
      spawn('vlt', args, {cwd: cwd}, function() {
        args[0] = 'commit';
        spawn('vlt', args, {cwd: cwd});
      });    
    } else {
      args[0] = 'delete';
      spawn('vlt', args, {cwd: cwd});  
    }
  });
};
