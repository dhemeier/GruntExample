"use strict";


module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        meta: {
            jsFiles: [
                'js/vendor/jquery-1.10.2.min.js',
                'js/plugins.js',
                'js/main.js'
            ]
        },

        uglify: {
            javascript: {
                files  : {
                    'dist/js/script.js': ['dist/js/script.js']
                },
                options: {
                    mangle: false
                }
            }
        },

        concat: {
            options   : {
                separator: ';'
            },
            javascript: {
                src : ['<%= meta.jsFiles %>'],
                dest: 'dist/js/script.js'
            }
        },

        cssmin: {
            styles: {
                options: {
                    banner             : '/* My minified css file */'
                },
                files  : {
                    'dist/css/style.css': ['css/**/*.css']
                }
            }
        },

        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port    : 9999
                }
            }
        },

        watch: {
            dev: {
                files  : ['js/**/*', 'css/**/*'],
                tasks  : ['concat:javascript', 'cssmin:styles'],
                options: {
                    atBegin: true
                }
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('dev', ['connect:server', 'watch:dev']);

    grunt.registerTask('css', ['cssmin:styles']);

    grunt.registerTask('js', ['concat:javascript', 'uglify:javascript']);
};
