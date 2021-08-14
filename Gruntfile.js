module.exports =function (grunt){ //Vamos a permitirle al node exportarle el grunt
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });



    grunt.initConfig({ // aquí comienza la configuración de la herramienta
        sass: { // de sass
            dist: { //para que genere la versión de distribución 
                files: [{ //buscando en todos los archivos
                    expand: true, 
                    cwd: 'css',  // dentro de la carpeta css
                    src: ['*.scss'], // que termina con extensión scss
                    dest: 'css', // los mande a la carpeta css
                    ext: '.css' // y le ponga la extensión css
                }]
            }
        },
        watch: {//Cada vez que hagamos un cambio en los archivos con extensión scss, va a cambiar el css.
            files: ['css/*scss'], //los archivos que va a agarrar
            tasks: ['css'] //la tarea que va a realizar
        },

        browserSync: {
            dev: { //vamos a decirle que en el sourse del
                bsFiles: { //browser files
                    src: [ //busque archivos 
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                options: { // y se indica cual será la ruta de nuestro servidor.
                    watchTask: true,
                    server: {
                        baseDir: './' //directorio base para nuestro servidor
                    }
                }
            }
        },
        imagemin: {
            dynamic:{ //el proceso es igual que los otros pero comprimiendo imagenes.
                files: [{
                    expand: true, 
                    cwd: './',
                    src: 'images/*.(png,gif,jpg,jpeg)',
                    dest: 'dist/'
                }]
            }
        },
        copy: {
            html: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: './',
                    src: ['*.html'],
                    dest: 'dist'
                }]
            }, 
            font: {
                files: [{
                    expand: true, 
                    dot: true, 
                    cwd: 'node_modules/open-iconic/font',
                    src: ['font/*.*'],
                    dest: 'dist'
                }]
            }
        },
        clean: {
            build: {
                src: ['dist/']
            }
        },
        cssmin:{
            dist:{}
        },
        uglify: {
            dist: {}
        },
        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },
            release: {
                files: [{
                    src: [
                        'dist/js/*.js',
                        'dist/css/*.css',
                    ]
                }]
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {}
        },

        useminPrepare: {
            foo: {
                dest: 'dist',
                src: ['index.html', 'about.html', 'precios.html', 'contacto.html']
            },
            options:{
                flow:{
                    steps: {
                        css: ['cssmin'],
                        js: ['uglify']
                    },
                    post: {
                        css: [{
                            name: 'cssmin',
                            createConfig: function(context, block){
                                var generated = context.options.generated;
                                generated.options = {
                                    keepSpecialComments: 0,
                                    rebase: false
                                }
                            }
                        }]
                    }
                }
            }
        },
        usemin: {
            html: ['dist/index.html', 'dist/about.html', 'dist/precios.html', 'dist/contacto.html'],
            options: {
                assetsDir:['dist', 'dist/css', 'dist/js']
            }
        }
    });
    // grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks('grunt-contrib-sass'); // Siempre que usemos grunt hay que agregarle las tareas y cargarle los paquetes o plugins que estamos utilizando.
    // grunt.loadNpmTasks('grunt-browser-sync');
    // grunt.loadNpmTasks('grunt-contrib-imagemin')
    grunt.registerTask('css', ['sass']); // Aquí registramos las tareas.
    grunt.registerTask('default', ['browserSync' , 'watch']);
    grunt.registerTask('img:compress', ['imagemin']);
    grunt.registerTask('build', [
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin'
    ]);
};