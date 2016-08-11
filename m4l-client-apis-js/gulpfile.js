"use strict"

var browserify = require("browserify");
var buffer = require('vinyl-buffer');
var glob = require("glob")
var gulp = require('gulp');
var inject = require('gulp-inject-string')
var source = require('vinyl-source-stream');
var tsify = require("tsify");

gulp.task("default", function() {
	gulp.watch("src/**/*.ts", ["compile"])
	return compile()
})

gulp.task("compile", function() {
	return compile()
})

function compile() {
	var b = browserify()
	.add(glob.sync("src/**/*.ts"))
	.plugin(tsify)
	.bundle()
	.on("error", function(e) {
		console.log("Error in browserify: " + e.message)
	})
	.pipe(source("client-apis.js"))
	.pipe(buffer())
	.pipe(inject.prepend("var me = this;\n"))
	.pipe(gulp.dest("./target/"))
	return b;
}

