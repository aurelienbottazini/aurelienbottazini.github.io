module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower_concat: {
            all: {
                dest: '_js/_bower.js',
                cssDest: '_css/_bower.css',
                exclude: [
                ],
                dependencies: {
                },
                bowerOptions: {
                    relative: false
                }
            }
        },
        uglify: {
            bower: {
                options: {
                    mangle: true,
                    compress: true
                },
                files: {
                    'js/main.min.js': [ '_js/_bower.js', '_js/main.js']
                }
            }
        },
        sass: {                              // Task
            dist: {                            // Target
                options: {                       // Target options
                    style: 'compressed'
                },
                files: {                         // Dictionary of files
                    'css/main.css': '_sass/main.scss',       // 'destination': 'source'
                    'css/resume.css': '_sass/resume.scss'
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'css/resume.css': ['_css/_bower.css', 'css/resume.css'],
                    'css/main.css': ['_css/_bower.css', 'css/main.css']
                }
            },
        }
    });
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['bower_concat', 'sass', 'cssmin', 'uglify']);
};
