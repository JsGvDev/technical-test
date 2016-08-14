module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-sass');

  grunt.initConfig({

    concat: {
      options: {
        separator: '\n',
      },
      basic_and_extras: {
        files: {
          'www/scripts/application-libs.js':  [
            'bower_components/angular-ui-router/release/angular-ui-router.min.js',
            'bower_components/mobile-angular-ui/dist/js/mobile-angular-ui.min.js',
            'bower_components/mobile-angular-ui/dist/js/mobile-angular-ui.gestures.min.js',
            'bower_components/angular-bootstrap/ui-bootstrap.min.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
            'bower_components/angular-animate/angular-animate.min.js'
          ],
        },
      }
    },
    uglify: {
      options: {
        banner: '// Twelth (<%= grunt.template.today("yyyy-mm-dd") %>)\n',
        mangleProperties: false
      },
      build: {
        src: 'www/scripts/application.js',
        dest: 'www/scripts/application.min.js'
      }
    },
    ngAnnotate: {
        options: {
            singleQuotes: true,
        },
        app1: {
          files: {
            'www/scripts/application.js': [
              'www/scripts/app/*.js',
              'www/scripts/app/**/*.js',
              'www/scripts/app/**/**/*.js',
              'www/scripts/app/**/**/**/*.js',
              'www/scripts/services/*.js',
              'www/scripts/services/**/*.js'
            ],
          },
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
          'www/stylesheets/application.css': ['www/stylesheets/sass/application.scss', 'www/stylesheets/sass/components.scss']
        }
      }
    }
  });

  grunt.registerTask("build", [
    'concat',
    'ngAnnotate',
    'sass',
    'uglify'
  ]);

  grunt.registerTask("default", [
    'connect:site1:keepalive'
  ]);
};
