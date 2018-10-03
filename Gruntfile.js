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
          'js/about.min.js':
          [
            '_js/_bower.js',
            '_js/common.js',
            '_js/about.js'],
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
    watch: {
      scripts: {
        files: ['_js/*.js'],
        tasks: ['uglify'],
        options: {
          spawn: false,
          interrupt: true
        },
      },
    },

    exec: {
      create_sketchnotes_yaml: {
        cmd: "ruby -e \"require 'yaml';File.open('_data/sketchnotes.yml', 'w') { |f| f.write Dir.new('sketchnotes').entries.select { |e| e =~ /\.jpg/}.to_yaml }\""
      }
    }
  });
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('default', ['prepare']);
  grunt.registerTask('prepare', ['bower_concat', 'uglify', 'exec:create_sketchnotes_yaml']);
};
