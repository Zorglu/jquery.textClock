module.exports = function(grunt) {

	grunt.initConfig({
		jshint: {
			dist: ['js/jquery.textClock.js']
		},
		watch: {
			js: {
				files: ['js/jquery.textClock.js'],
				tasks: ['jshint', 'uglify'],
				options: {
					spawn: false,
				}
			}
		},
		uglify: {
			js: {
				files: {
					'js/jquery.textClock.min.js': ['js/jquery.textClock.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['jshint','uglify','watch']);
};