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
                    'js/home.min.js': [ '_js/_bower.js', '_js/home.js'],
                    'js/org-export.min.js': ['_js/bower.js', '_js/org-export.js']
                }
            }
        },
        sass: {                              // Task
            dist: {                            // Target
                options: {                       // Target options
                    style: 'compressed'
                },
                files: {
                    '_css/default.css': '_sass/default.scss',
                    '_css/home.css': '_sass/home.scss',
                    'css/resume.css': '_sass/resume.scss',
                    'easyLearning/css/main.css': '_sass/easylearning.scss',
                    'cubex/css/main.css': '_sass/cubex.scss',
                    'css/org-export.css': '_sass/org-export.scss',
                    '_css/htmlize.css': '_sass/htmlize.scss'
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'css/default.min.css': ['_css/_bower.css', '_css/default.css'],
                    'css/resume.css': ['_css/_bower.css', 'css/resume.css'],
                    'css/home.min.css': ['_css/_bower.css', '_css/home.css'],
                    'easyLearning/css/main.css': ['_css/_bower.css', 'easyLearning/css/main.css'],
                    'cubex/css/main.css': ['_css/_bower.css', 'cubex/css/main.css'],
                    'css/org-export.min.css': ['_css/_bower.css', '_css/htmlize.css','css/org-export.css']
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
            },
            create_sketchnotes_yaml: {
                cmd: "ruby -e \"require 'yaml';puts Dir.new('sketchnotes').entries.select { |e| e =~ /\.jpg/}.to_yaml\" | > _data/sketchnotes.yml"
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

    grunt.registerTask('default', ['prepare', 'exec:jekyll']);
    grunt.registerTask('prepare', ['bower_concat', 'sass', 'cssmin', 'uglify', 'exec:create_sketchnotes_yaml']);
};
