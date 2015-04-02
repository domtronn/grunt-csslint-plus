/*
 * grunt-csslint-plus
 * https://github.com/domtronn/grunt-csslint-plus
 *
 * Copyright (c) 2015 Dom Charlesworth
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('csslint_plus', 'Run CSSLint with custom rules', function() {
    // Merge task-specific and/or target-specific options with these defaults.
		var path = require('path');
		var options = this.options();
		// Have to require instance of CSS Lint being used by the root gruntfile
		var csslintPath = path.resolve( "node_modules/grunt-contrib-csslint/node_modules/csslint/lib/csslint-node.js");
    var csslint = require( csslintPath ).CSSLint;


		if ( this.filesSrc ) {
			this.filesSrc.forEach(function (ruleFile) {
				var rule = require( path.resolve( ruleFile ) ).Rule;
				csslint.addRule( rule );

     		grunt.log.writeln( 'Adding new rule: %s', rule.name );
			});
		}

		if (options.print && options.print.ruleCount) {
			grunt.log.writeln( 'Currently running %s csslint rules', csslint.getRules().length );
		}

		grunt.task.run('csslint:strict');
  });
};
