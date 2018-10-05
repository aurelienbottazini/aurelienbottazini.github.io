module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      blog: {
        options: {
          mangle: false,
          compress: false
        },
        files: {
          'js/default.min.js':
          [
            '_js/dropcap.js',
            '_js/org-export.js',
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
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('default', ['prepare']);
  grunt.registerTask('prepare', ['uglify', 'exec:create_sketchnotes_yaml']);
};
