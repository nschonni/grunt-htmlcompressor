module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({

    nodeunit: {
      tests: ["test/*_test.js"]
    },
    clean: {
      output: ['test/fixtures/output']
    },
    htmlcompressor: {
      compress: {
        expand: true,
        src: [
          'test/fixtures/html/*.html'
        ],
        rename: function (dest, matchedSrcPath) {
            return 'test/fixtures/output/' + matchedSrcPath.split('/').pop();
        },
        options: {
          type: 'html',
          preserveServerScript: true
        }
      },
      depreciated: {
        src: [
          'test/fixtures/html/*.html'
        ],
        options: {
          processName: function (path) {
            path = path.split('/').pop();
            return 'test/fixtures/output/' + path;
          }
        }
      }
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      },
      globals: {}
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.registerTask('test', ['clean', 'htmlcompressor', 'nodeunit']);
  grunt.registerTask('default', ['jshint', 'test']);
};
