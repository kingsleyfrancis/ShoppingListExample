var gulp = require("gulp"),
    buffer = require("vinyl-buffer"),
    source = require("vinyl-source-stream"),
    babelify = require("babelify"),
    del = require("del"),
    browserify = require("browserify");

    gulp.task("clean", function(){
        return del("dist/");
    })


    gulp.task("build", ["clean"], function() {
        return browserify("source/AnimatedShoppingList.js")
        .transform("babelify", {
            presets: ["env", "react", "es2015"]
        })
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("dist"));
    });

    gulp.task("default", function(){
        gulp.watch("source/AnimatedShoppingList.js", ["build"]);
    });
