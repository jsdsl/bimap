/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 8:48 PM -- June 16th, 2019.
 * Project: @jsdsl/bimap
 * 
 * @jsdsl/bimap - A bidirectional map written in TypeScript.
 * Copyright (C) 2021 Trevor Sears
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

const gulp = require("gulp");
const typescript = require("gulp-typescript");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify-es").default;
const del = require("del");

const paths = {
	
	typescript: {
		
		dir: "ts/",
		allFiles: "ts/**/*.ts",
		tsconfig: "ts/tsconfig.json"
		
	},
	
	javascript: {
		
		dir: "js/",
		allFiles: "js/**/*.js",
		entryPoint: "js/main.js",
		entryPointFileName: "main.js"
		
	},
	
	typedefs: {
		
		dir: ".d.ts/",
		allFiles: ".d.ts/**/*.d.ts"
		
	}
	
};

let typescriptProject = typescript.createProject(paths.typescript.tsconfig);

// The default Gulp task.
gulp.task("default", defaultTask);

// Cleans (deletes) all generated/compiled files.
gulp.task("clean", clean);

// Builds the entire project.
gulp.task("build", build);

// Cleans and builds the entire project.
gulp.task("rebuild", rebuild);

// Watch for changes to relevant files and compile-on-change.
gulp.task("watch", watch);

function defaultTask(done) {

	return rebuild(done);
	
}

function clean(done) {
	
	return del([
		paths.javascript.dir,
		paths.typedefs.dir
	]);
	
}

function build(done) {
	
	return buildJavaScriptPipeline(done);
	
}

function rebuild(done) {
	
	gulp.series(clean, build)(done);
	
}

function buildJavaScriptPipeline(done) {
	
	return gulp.series(
		compileTypeScript,
		uglifyJavaScript
	)(done);
	
}

function compileTypeScript(done) {
	
	let proj =
		typescriptProject.src()
			.pipe(sourcemaps.init())
			.pipe(typescriptProject());
	
	let compileJS = (done) => {
		
		return proj.js
			.pipe(sourcemaps.write("."))
			.pipe(gulp.dest(paths.javascript.dir));
		
	};
	
	let compileDTS = (done) => {
		
		return proj.dts
			.pipe(gulp.dest(paths.typedefs.dir));
		
	};
	
	return gulp.parallel(compileJS, compileDTS)(done);
	
}

function uglifyJavaScript(done) {

	return gulp.src(paths.javascript.allFiles)
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(uglify())
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(paths.javascript.dir));

}

function watch(done) {
	
	gulp.watch([paths.typescript.allFiles], buildJavaScriptPipeline);
	
}
