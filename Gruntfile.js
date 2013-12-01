'use strict';

/**
 * Livereload and connect variables
 */
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({
  port: LIVERELOAD_PORT
});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};


module.exports = function(grunt) {

  // Auto load tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    // Read package.json
    pkg: grunt.file.readJSON('package.json'),


    /**
     * Project details
     */

    // Banner to be used on compiled files
    banner: '/*!\n' +
            ' * <%= pkg.title %>\n' +
            ' * <%= pkg.author.url %>\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %>\n' +
            ' */\n',

    // Root dir setup
    src:  '_src',
    dist: '.', // empty for root

    // Project setup
    scripts: {
      src: {
        dir: '<%= src %>/scripts',
        files: [
          '<%= scripts.src.dir %>/global.js'
        ],
      },
      dist: {
        dir: '<%= dist %>/assets/js',
        uncompressed: '<%= scripts.dist.dir %>/global.js',
        compressed:   '<%= scripts.dist.dir %>/global.min.js'
      }
    },

    styles: {
      src: {
        dir: '<%= src %>/styles',
        files: [
          '<%= styles.src.dir %>/global.scss'
        ],
      },
      dist: {
        dir: '<%= dist %>/assets/css',
        uncompressed: '<%= styles.dist.dir %>/global.css',
        compressed:   '<%= styles.dist.dir %>/global.min.css'
      }
    },

    images: {
      src: {
        dir: '<%= src %>/images',
      },
      dist: {
        dir: '<%= dist %>/assets/img',
      }
    },


    /**
     * Scripts Tasks
     */

    // JShint
    jshint: {
      gruntfile: 'Gruntfile.js',
      files: ['<%= scripts.src.files %>'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Concatenate JS
    concat: {
      options: {
        stripBanners: true,
        banner: '<%= banner %>'
      },
      js: {
        nonull: true,
        src: '<%= jshint.files %>',
        dest: '<%= scripts.dist.uncompressed %>'
      }
    },

    // Uglify
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: ['<%= concat.js.dest %>'],
        dest: '<%= scripts.dist.compressed %>'
      },
    },


    /**
     * Styles Tasks
     */

    // Sass compile
    sass: {
      dist: {
        options: {
          banner: '<%= banner %>',
          style: 'expanded',
          sourcemap: true, // Requires Sass 3.3.0 alpha: `sudo gem install sass --pre`
          trace: true
        },
        files: {
          '<%= styles.dist.uncompressed %>': '<%= styles.src.files %>'
        }
      }
    },

    // Autoprefixer
    autoprefixer: {
      dist: {
        options: {
          browsers: [
            'last 4 version',
            'safari 6',
            'ie 8',
            'ie 9',
            'opera 12.1',
            'ios 6',
            'android 4'
          ]
        },
        src: '<%= styles.dist.uncompressed %>',
        dest: '<%= styles.dist.uncompressed %>'
      }
    },

    // Minify CSS
    cssmin: {
      combine: {
        options: {
          banner: '<%= banner %>',
          keepSpecialComments: 0,
          report: 'min'
        },
        files: {
          '<%= styles.dist.compressed %>': '<%= styles.dist.uncompressed %>'
        }
      }
    },


    /**
     * Image Tasks
     */

    // imagemin
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3, // PNG
          progressive: true     // JPG
        },
        files: [{
          expand: true,
          cwd: '<%= images.src.dir %>',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= images.dist.dir %>',
        }],
      }
    },

    // SVG to PNG
    svg2png: {
      dist: {
        files: [{
          src: ['<%= images.src.dir %>/**/*.svg'],
        }],
      }
    },

    // SVG minify
    svgmin: {
      options: {
        plugins: [{
          removeViewBox: false
        }]
      },
      dist: {
        files: [{
          expand: true, // Enable dynamic expansion.
          cwd: '<%= images.src.dir %>', // Src matches are relative to this path.
          src: ['**/*.svg'], // Actual pattern(s) to match.
          dest: '<%= images.dist.dir %>', // Destination path prefix.
        }],
      }
    },


    /**
     * Misc Tasks
     */

    // Clean
    clean: {
      img: [
        '<%= images.dist.dir %>/**/*'
      ],
      js: [
        '<%= scripts.dist.dir %>/**/*'
      ],
      css: [
        '<%= styles.dist.dir %>/**/*'
      ],
      jekyll: [
        '_site'
      ]
    },

    copy: {
      // Copy vendor (non compiled) scripts to dist
      vendorScripts: {
        expand: true,
        cwd: '<%= scripts.src.dir %>/vendor/',
        src: '**/*',
        dest: '<%= scripts.dist.dir %>/vendor/',
        flatten: false,
        filter: 'isFile'
      }
    },

    // Jekyll
    jekyll: {
      options: {
        src: './'
      },
      build: {
        dest: './_site',
        config: '_config.yml'
      }
    },

    // Start server
    connect: {
      options: {
        port: 9000,
        base: '_site',
        open: true,
        hostname: '*'
      },
      livereload: {
        options:{
          middleware: function (connect) {
            return [
              lrSnippet, mountFolder(connect, '_site')
            ];
          }
        }
      }
    },

    // Watch
    watch: {

      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile']
      },

      sass: {
        files: '<%= styles.src.dir %>/**/*.scss',
        tasks: ['sass', 'autoprefixer', 'cssmin']
      },

      scripts: {
        files: '<%= jshint.files %>',
        tasks: ['jshint', 'concat', 'uglify']
      },

      vendorScripts: {
        files: '<%= scripts.src.dir %>/vendor/**/*.js',
        tasks: ['copy:vendorScripts']
      },

      images: {
        files: '<%= images.src.dir %>/**/*.{png,jpg,jpeg,gif,svg}',
        tasks: ['svg2png', 'svgmin', 'imagemin']
      },

      jekyll: {
        files: [
          // Files to trigger Jekyll build
          '_config.yml',
          'Gruntfile.js',
          './**/*.{html,md}',
          '<%= styles.dist.dir %>/*.css',
          '<%= scripts.dist.dir %>/**/*.js',
          '<%= images.dist.dir %>/**/*.{png,jpg,jpeg,gif,webp,svg}',
          '!./node_modules/**/*.*',
          '!./_site/**/*.*'
        ],
        tasks: ['clean:jekyll', 'jekyll:build']
      },

      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          'Gruntfile.js',
          '_config.yml',
          './_site/**/*.*'
        ]
      }
    },

  });


  /**
   * Tasks
   */

  // Default: $ grunt
  grunt.registerTask('default', [
    'clean',
    'jshint',
    'concat',
    'uglify',
    'copy:vendorScripts',
    'sass',
    'autoprefixer',
    'cssmin',
    'svg2png',
    'svgmin',
    'imagemin',
    'jekyll'
  ]);

  // Run default task then watch: $ grunt server
  grunt.registerTask('server', [
    'default',
    'connect',
    'watch',
  ]);

};
