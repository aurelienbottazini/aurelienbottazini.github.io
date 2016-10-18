module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower_concat: {
      all: {
        dest: '_js/_bower.js',
        cssDest: '_css/_bower.css',
        exclude: [
          'velocity',
        ],
        dependencies: {
        },
        bowerOptions: {
          relative: false
        },
      }
    },
    uglify: {
      bower: {
        options: {
          mangle: false,
          compress: false
        },
        files: {
          'js/home.min.js':
          [
            '_js/_bower.js',
            '_js/common.js',
            '_js/home.js'],
          'js/resume.min.js':
          ['_js/_bower.js',
           '_js/common.js'],
          'js/default.min.js':
          [
            '_js/_bower.js',
            '_js/common.js',
          ],
        }
      },
    },
    cssmin: {
      combine: {
        files: {
          'css/default.min.css': ['_css/_bower.css', '_css/default.css'],
          'css/resume.css': ['_css/_bower.css', 'css/resume.css'],
          'css/home.min.css': ['_css/_bower.css', '_css/home.css'],
          'easyLearning/css/main.css': ['_css/_bower.css', 'easyLearning/css/main.css'],
          'cubex/css/main.css': ['_css/_bower.css', 'cubex/css/main.css'],
        }
      },
    },

    watch: {
      scripts: {
        files: ['_js/*.js'],
        tasks: ['uglify'],
        options: {
          spawn: false,
          interrupt: true
        },
      },
      css: {
        files: ['_css/*.css'],
        tasks: ['cssmin'],
        options: {
          spawn: false,
          interrupt: true
        }
      },
    },

    exec: {
      create_sketchnotes_yaml: {
        cmd: "ruby -e \"require 'yaml';File.open('_data/sketchnotes.yml', 'w') { |f| f.write Dir.new('sketchnotes').entries.select { |e| e =~ /\.jpg/}.to_yaml }\""
      }
    }
  });
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('default', ['prepare']);
  grunt.registerTask('prepare', ['bower_concat', 'cssmin', 'uglify', 'exec:create_sketchnotes_yaml']);
};
