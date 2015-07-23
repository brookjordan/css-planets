module.exports = function(grunt) {

	var __tasks = {};


	//	DEV TASKS
	grunt.registerTask( 'dev_dump', [
			'copy:dump_dev', 'copy:images_dev',
		]);
	grunt.registerTask( 'dev_scripts', [
			'copy:scripts_dev',
		]);
	grunt.registerTask( 'dev_styles', [
			'sass:dev', 'autoprefixer:dev'
		]);
	grunt.registerTask( 'dev_html', [
			'processhtml:include_dev', 'processhtml:dev',
		]);

	grunt.registerTask( 'dev', [
			'dev_dump', 'dev_scripts', 'dev_styles', 'dev_html',
		]);


	//	WATCHED DEV TASKS
	grunt.registerTask( 'default', [
			'dev', 'watch',
		]);





	grunt.initConfig({

		//	HTML Templating
		processhtml: {

			options: {
				recursive: true,
			},

			include_dev: {
				options: {
					commentMarker: 'i',
					includeBase: 'project/src/templates',
				},

				files: [{
					expand: true,

					cwd: 'project/src/pages',
					src: '**/*.html',
					dest: 'project/dev',
					ext: '.html',
				}],
			},

			dev: {
				options: {
					commentMarker: 'builddev',
				},

				files: [{
					expand: true,

					cwd: 'project/dev',
					src: '**/*.html',
					dest: 'project/dev',
					ext: '.html',
				}],
			},

			pre: {
				options: {
					commentMarker: 'buildpre',
				},

				files: [{
					expand: true,

					cwd: 'project/src/pages/',
					src: '**/*.html',
					dest: 'project/temp/pages/compiled',
					ext: '.html',
				}],
			},

			prod: {
				options: {
					commentMarker: 'buildprod',
				},

				files: [{
					expand: true,

					cwd: 'project/src/pages/',
					src: '**/*.html',
					dest: 'project/temp/pages/compiled',
					ext: '.html',
				}],
			},

		},



		//	Change root URLs to be relative URLs
		relativeRoot: {
			options: {
				//root: 'project/temp/pages/compiled'
			},

			dev: {
				files: [{
					expand: true,
					cwd:  'project/temp/pages/compiled',
					src: [ '**/*.html' ],
					dest: 'project/temp/pages/relativeRoot'
				}],
			},

			pre: {
				files: [{
					expand: true,
					cwd:  'project/temp/pages/compiled',
					src: [ '**/*.html' ],
					dest: 'project/temp/pages/relativeRoot'
				}],
			},

			prod: {
				files: [{
					expand: true,
					cwd:  'project/temp/pages/compiled',
					src: [ '**/*.html' ],
					dest: 'project/temp/pages/relativeRoot'
				}],
			},
		},



		//	Minify the HTML
		htmlmin: {
			options: {
				removeComments: true,
				collapseWhitespace: true,
				//conservativeCollapse: true,
				minifyJS: true,
			},

			dev: {
				files: [{
					expand: true,

					cwd: 'project/temp/pages/relativeRoot',
					src: '**/*.html',
					dest: 'project/build',
					ext: '.html',
				}],
			},

			pre: {
				files: [{
					expand: true,

					cwd: 'project/temp/pages/relativeRoot',
					src: '**/*.html',
					dest: 'project/build',
					ext: '.html',
				}],
			},

			prod: {
				files: [{
					expand: true,

					cwd: 'project/temp/pages/relativeRoot',
					src: '**/*.html',
					dest: 'project/build',
					ext: '.html',
				}],
			},
		},



		//	Minify the images
		imagemin: {
			options: {

			},

			dev: {
				files: [{
					expand: true,
					cwd: 'project/src/images/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'project/build/images'
				}],
			},

			pre: {
				files: [{
					expand: true,
					cwd: 'project/src/images/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'project/build/images'
				}],
			},

			prod: {
				files: [{
					expand: true,
					cwd: 'project/src/images/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'project/build/images'
				}],
			},
		},



		//	Render the css
		sass: {
			options: {
				//file: 'null',
				//data: 'null',
				//importer: 'undefined',
				//includePaths: '[]',
				//indentedSyntax: 'false',
				//omitSourceMapUrl: 'false',
				//outFile: 'null',
				outputStyle: 'compressed', // nested, compact, compressed, expanded
				//precision: '5',
				//sourceComments: 'false',
				sourceMap: true,
				//sourceMapEmbed: 'false',
				sourceMapContents: true,
			},

			dev: {
				options: {
					outputStyle: 'nested',
				},

				files: [{
					expand: true,

					cwd: 'project/src/styles',
					src: '**/*.scss',
					dest: 'project/temp/dev/styles',
					ext: '.css',
				}],
			},

			pre: {
				files: [{
					expand: true,

					cwd: 'project/src/styles/inline',
					src: '**/*.scss',
					dest: 'project/temp/styles/inline/compiled',
					ext: '.min.css',
				}],
			},

			prod: {
				files: [{
					expand: true,

					cwd: 'project/src/styles/inline',
					src: '**/*.scss',
					dest: 'project/temp/styles/inline/compiled',
					ext: '.min.css',
				}],
			},
		},



		//	Make the CSS work with older browsers
		autoprefixer: {
			options: {
				browsers: [ 'last 10 versions', 'ie 8', 'ie 9' ],
				map: true,
			},

			dev: {
				files: [{
					expand: true,

					cwd: 'project/temp/dev/styles',
					src: '**/*.css',
					dest: 'project/dev/styles',
					ext: '.css',
				}],
			},

			pre: {
				files: [{
					expand: true,

					cwd: 'project/temp/styles/inline/compiled',
					src: '**/*.css',
					dest: 'project/temp/templates/styles',
					ext: '.min.css',
				}],
			},

			prod: {
				files: [{
					expand: true,

					cwd: 'project/temp/styles/inline/compiled',
					src: '**/*.css',
					dest: 'project/temp/templates/styles',
					ext: '.min.css',
				}],
			},
		},



		//	Start fresh
		clean: {
			dev: [ "project/dev/", "project/temp/dev", ],
			temp: [ "project/temp", ],
		},



		//	Copy files that aren't processed
		copy: {
			dump_dev: {
				files: [
					{
						expand: true,
						cwd: 'project/src/dump/',
						src: ['**/*.*'],
						dest: 'project/dev',
					},
				],
			},
			scripts_dev: {
				files: [
					{
						expand: true,
						cwd: 'project/src/scripts/',
						src: ['**/*.js'],
						dest: 'project/dev/scripts',
					},
				],
			},
			images_dev: {
				files: [
					{
						expand: true,
						cwd: 'project/src/images/',
						src: ['**/*'],
						dest: 'project/dev/images',
					},
				],
			},

			dump_pre: {
				files: [
					{
						expand: true,
						cwd: 'project/src/dump/',
						src: ['**/*.*'],
						dest: 'project/pre',
					},
				],
			},

			dump_prod: {
				files: [
					{
						expand: true,
						cwd: 'project/src/dump/',
						src: ['**/*.*'],
						dest: 'project/prod',
					},
				],
			},
		},



		//	Update the above when required
		watch: {
			options: {
				reload: true,
				spawn: false,
			},

			dev_pages: {
				files: [
					'project/src/pages/**/*.html',
					'project/src/templates/**/*.html'
				],
				tasks: [ 'dev_html', ],
			},

			dev_styles: {
				files: [ 'project/src/styles/**/*.*', ],
				tasks: [ 'dev_styles', ],
			},
		},

	});



	require('load-grunt-tasks')(grunt);

};