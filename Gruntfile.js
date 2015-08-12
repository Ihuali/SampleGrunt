module.exports = function(grunt){
   "use strict";
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
 
    grunt.initConfig({
 
        pkg: grunt.file.readJSON('package.json'),
		uglify: {
	      options: {
	        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
	      },
	      my_target: {
	        files: [
	          {
	            expand: true,
	            //相对路径
	            cwd: 'assets/js/',
	            src: '*.js',
	            dest: 'build/js/',
	            rename: function (dest, src) {  
	                  var folder = src.substring(0, src.lastIndexOf('/'));  
	                  var filename = src.substring(src.lastIndexOf('/'), src.length);  
	                  //  var filename=src;  
	                  filename = filename.substring(0, filename.lastIndexOf('.'));  
	                  var fileresult=dest + folder + filename + '.min.js';  
	                  grunt.log.writeln("现处理文件："+src+"  处理后文件："+fileresult);  
	                  return fileresult;  
	                  //return  filename + '.min.js';  
	                } 
	          }
	        ]
	      }
	    },
	    cssmin: {
	      options: {
	        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
	        //美化代码
	        beautify: {
	          //中文ascii化，非常有用！防止中文乱码的神配置
	          ascii_only: true
	        }
	      },
	      my_target: {
	        files: [
	          {
	            expand: true,
	            //相对路径
	            cwd: 'assets/css/',
	            src: '*.css',
	            dest: 'build/css/',
	            rename: function (dest, src) {  
	                var folder = src.substring(0, src.lastIndexOf('/'));  
	                var filename = src.substring(src.lastIndexOf('/'), src.length);  
	                //  var filename=src;  
	                filename = filename.substring(0, filename.lastIndexOf('.'));  
	                var fileresult=dest + folder + filename + '.min.css';  
	                grunt.log.writeln("现处理文件："+src+"  处理后文件："+fileresult);  
	                return fileresult;  
	                //return  filename + '.min.js';
	                }
	          }
	        ]
	      }
	    },
        sass: {
			//编译单个sass文件
            /*build: {
                files: {
                    'build/css/master.css': 'assets/sass/master.scss'
                }
            }*/
			//编译多个sass文件
			development: {
                files: [{
	                    expand: true,
	                    cwd: 'assets/sass/',
	                    src: '*.scss',
	                    dest: 'assets/css/',
	                    ext: '.css',
	                    rename: function (dest, src) {  
			                var folder = src.substring(0, src.lastIndexOf('/'));  
			                var filename = src.substring(src.lastIndexOf('/'), src.length);  
			                //  var filename=src;  
			                filename = filename.substring(0, filename.lastIndexOf('.'));  
			                var fileresult=dest + folder + filename + '.css';  
			                grunt.log.writeln("css编译成功："+fileresult); 
			                grunt.log.writeln('---------------------------------------') 
			                return fileresult;  
			                //return  filename + '.min.js';
			            }
                	}]
           		}
           		
        },
        watch: {
            /*html: {
                files: ['index.html'],
                tasks: ['htmlhint']
            },
            js: {
                files: ['assets/js/base.js'],
                tasks: ['uglify']
            },*/
            css: {
                files: ['assets/sass/**/*.scss'],
                tasks: ['buildcss']
            }
		}
	});
    grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	 grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['uglify', 'cssmin']);
    grunt.registerTask('buildcss',  ['sass']);
 
};