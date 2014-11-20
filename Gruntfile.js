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
                },
                mainFiles: {
                    'velocity': ['velocity.js', 'velocity.ui.js']
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
                    'js/main.min.js': [ '_js/_bower.js', '_js/main.js'],
                    'js/org-export.min.js': ['_js/bower.js', '_js/org-export.js']
                }
            }
        },
        sass: {                              // Task
            dist: {                            // Target
                options: {                       // Target options
                    style: 'compressed'
                },
                files: {                         // Dictionary of files
                    'css/main.css': '_sass/main.scss',
                    'css/resume.css': '_sass/resume.scss',
                    'easyLearning/css/main.css': '_sass/easylearning.scss',
                    'cubex/css/main.css': '_sass/cubex.scss',
                    'css/org-export.css': '_sass/org-export.scss'
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'css/resume.css': ['_css/_bower.css', 'css/resume.css'],
                    'css/main.css': ['_css/_bower.css', 'css/main.css'],
                    'easyLearning/css/main.css': ['_css/_bower.css', 'easyLearning/css/main.css'],
                    'cubex/css/main.css': ['_css/_bower.css', 'cubex/css/main.css'],
                    'css/org-export.min.css': ['_css/_bower.css', 'css/org-export.css']
                }
            },
        },

        watch: {
            scripts: {
                files: ['_js/*.js'],
                tasks: ['uglify', 'exec:jekyll'],
                options: {
                    spawn: false,
                    interrupt: true
                },
            },
            css: {
                files: ['_sass/*.scss'],
                tasks: ['sass', 'cssmin', 'exec:jekyll'],
                options: {
                    spawn: false,
                    interrupt: true
                }
            },
            anything_but_underscore: {
                files: ['**/*.html', '**/*.[gif|svg|jpg]', '!_*/**'],
                tasks: ['exec:jekyll'],
                options: {
                    spawn: false,
                    interrupt: true
                }
            }
        },

        exec: {
            jekyll: {
                cmd: 'jekyll build'
            }

        }
    });
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('default', ['bower_concat', 'sass', 'cssmin', 'uglify', 'exec:jekyll']);
    grunt.registerTask('prepare', ['bower_concat', 'sass', 'cssmin', 'uglify']);
};
