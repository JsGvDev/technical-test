module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-sass');

  grunt.initConfig({

    watch: {
      scripts: {
        files: [
          'www/scripts/application.js',
          'www/css/**/*.scss'
        ],
        tasks: [
          'uglify',
          'sass'
        ],
        options: {
          spawn: false,
        },
      },
    },
    uglify: {
      options: {
        banner: '// fitbug (<%= grunt.template.today("yyyy-mm-dd") %>)\n',
        mangleProperties: false
      },
      build: {
        src: 'www/scripts/application.js',
        dest: 'www/scripts/application.min.js'
      }
    },
    connect: {
      site1: {
        options: {
          port: 9000,
          base: 'www',
          livereload: true,
          open: true
        }
      }
    },
    sass: {
      options: {
        sourceMap: false
      },
      dist: {
        files: {
          'www/css/application.css': ['www/css/sass/application.scss']
        }
      }
    }
  });

  grunt.registerTask("build", [
    'uglify',
    'sass'
  ]);
};
