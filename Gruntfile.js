module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');
    grunt.loadNpmTasks('grunt-minified');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default',['jshint','minified','screeps']);
    grunt.initConfig({
        screeps: {
            options: grunt.file.readJSON('config/screep.json'),
            dist: {
                src: ['dist/*.js']
            }
        },
        minified : {
          files: {
            src: [
            'src/spawner.js',
            'src/role.harvester.js',
            'src/role.repairer.js',
            'src/role.upgrader.js',
            'src/role.builder.js',
            'src/main.js'
            ],
            dest: 'dist/'
          },
          options : {
            dest_filename: 'main.js',
            sourcemap: false,
            allinone: true
          }
        },
        jshint: {
            all: ['Gruntfile.js', 'src/**/*.js', 'src/**/*.js']
        }
    });
};