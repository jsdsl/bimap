/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	8:48 PM -- June 16th, 2019.
 *	Project: <name>
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
