/**
 * Grunt Build Script
 * - based on grunt v0.4
 */


// Start here: http://gruntjs.com/getting-started, run npm install -g grunt-cli (nodejs must be installed)
// Change to project root
// Run "npm install" to download all packages
// Run "grunt" to build js and developing with JS

module.exports = function(grunt) {
	'use strict';

	////////////////////////////////////////////////////////////////////////////////
	//
	// NPM Tasks
	//
	////////////////////////////////////////////////////////////////////////////////
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-rename');

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		name: 'jQuery.formKeeper',
		description: 'jQuery plugin formKeeper',
		version: '0.1.0',
		url: 'https://github.com/smollweide/jQuery-formKeeper',

		////////////////////////////////////////////////////////////////////////////////
		//
		// Directories
		//
		////////////////////////////////////////////////////////////////////////////////
		dirs: {

			path: '',
			core: [
				'src/base/*.js',
				'src/core/formkeeper.start.js',
				'src/core/formkeeper.config.js',
				'src/core/formkeeper.utils.js',
				'src/core/formkeeper.core.js',
				'src/core/jquery.formkeeper.js'
			],
			extension: 'src/extensions',
			cache: 'cache'
		},

		////////////////////////////////////////////////////////////////////////////////
		//
		// Concatination
		//
		////////////////////////////////////////////////////////////////////////////////
		concat: {
			core: {
				src: ['<%=dirs.core%>'],
				dest: '<%=dirs.cache%>/jquery.formKeeper.core.js'
			}
		},

		////////////////////////////////////////////////////////////////////////////////
		//
		// Minification
		//
		////////////////////////////////////////////////////////////////////////////////
		uglify: {
			core: {
				src: ['<%=concat.core.dest%>'],
				dest: 'jquery.formkeeper.core.min.js'
			},
			extensionMandatory: {
				src: ['<%=dirs.extension%>/formkeeper.extension.mandatory.js'],
				dest: 'jquery.formkeeper.extension.mandatory.min.js'
			},
			extensionEmail: {
				src: ['<%=dirs.extension%>/formkeeper.extension.email.js'],
				dest: 'jquery.formkeeper.extension.email.min.js'
			},
			extensionLength: {
				src: ['<%=dirs.extension%>/formkeeper.extension.length.js'],
				dest: 'jquery.formkeeper.extension.length.min.js'
			},
			extensionInteger: {
				src: ['<%=dirs.extension%>/formkeeper.extension.integer.js'],
				dest: 'jquery.formkeeper.extension.integer.min.js'
			},
			extensionNumber: {
				src: ['<%=dirs.extension%>/formkeeper.extension.number.js'],
				dest: 'jquery.formkeeper.extension.number.min.js'
			},
			extensionDate: {
				src: ['<%=dirs.extension%>/formkeeper.extension.date.js'],
				dest: 'jquery.formkeeper.extension.date.min.js'
			},
			extensionSelect: {
				src: ['<%=dirs.extension%>/formkeeper.extension.select.js'],
				dest: 'jquery.formkeeper.extension.select.min.js'
			},
			extensionTime: {
				src: ['<%=dirs.extension%>/formkeeper.extension.time.js'],
				dest: 'jquery.formkeeper.extension.time.min.js'
			},
			extensionPattern: {
				src: ['<%=dirs.extension%>/formkeeper.extension.pattern.js'],
				dest: 'jquery.formkeeper.extension.pattern.min.js'
			}
		}
	});

	////////////////////////////////////////////////////////////////////////////////
	//
	// Tasks
	//
	////////////////////////////////////////////////////////////////////////////////
	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', [
		'concat:core',
		'uglify'
	]);

};
