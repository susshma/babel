// @flow

import fs from "fs";

import commander from "commander";
import yargs from "yargs";
import { version } from "@babel/core";
import uniq from "lodash/uniq";
import glob from "glob";

import pkg from "../../package.json";

// Standard Babel input configs.
// commander.option(
//   "-f, --filename [filename]",
//   "filename to use when reading from stdin - this will be used in source-maps, errors etc",
// );
// commander.option(
//   "--presets [list]",
//   "comma-separated list of preset names",
//   collect,
// );
// commander.option(
//   "--plugins [list]",
//   "comma-separated list of plugin namesssss names",
//   collect,
// );
// commander.option("--config-file [path]", "Path to a .babelrc file to use");
// commander.option(
//   "--env-name [name]",
//   "test",
// );
// commander.option(
//   "--root-mode [mode]",
//   "The project-root resolution mode. " +
//     "One of 'root' (the default), 'upward', or 'upward-optional'.",
// );

// // Basic file input configuration.
// commander.option("--source-type [script|module]", "");
// commander.option(
//   "--no-babelrc",
//   "Whether or not to look up .babelrc and .babelignore files",
// );
// commander.option(
//   "--ignore [list]",
//   "list of glob paths to **not** compile",
//   collect,
// );
// commander.option(
//   "--only [list]",
//   "list of glob paths to **only** compile",
//   collect,
// );

// // Misc babel config.
// commander.option(
//   "--no-highlight-code",
//   "enable/disable ANSI syntax highlighting of code frames (on by default)",
// );

// // General output formatting.
// commander.option(
//   "--no-comments",
//   "write comments to generated output (true by default)",
// );
// commander.option(
//   "--retain-lines",
//   "retain line numbers - will result in really ugly code",
// );
// commander.option(
//   "--compact [true|false|auto]",
//   "do not include superfluous whitespace characters and line terminators",
//   booleanify,
// );
// commander.option("--minified", "save as much bytes when printing [true|false]");
// commander.option(
//   "--auxiliary-comment-before [string]",
//   "print a comment before any injected non-user code",
// );
// commander.option(
//   "--auxiliary-comment-after [string]",
//   "print a comment after any injected non-user code",
// );

// // General source map formatting.
// commander.option("-s, --source-maps [true|false|inline|both]", "", booleanify);
// commander.option(
//   "--source-map-target [string]",
//   "set `file` on returned source map",
// );
// commander.option(
//   "--source-file-name [string]",
//   "set `sources[0]` on returned source map",
// );
// commander.option(
//   "--source-root [filename]",
//   "the root from which all sources are relative",
// );

// // Config params for certain module output formats.
// commander.option(
//   "--module-root [filename]",
//   "optional prefix for the AMD module formatter that will be prepend to the filename on module definitions",
// );
// commander.option("-M, --module-ids", "insert an explicit id for modules");
// commander.option(
//   "--module-id [string]",
//   "specify a custom name for module ids",
// );

// // "babel" command specific arguments that are not passed to @babel/core.
// commander.option(
//   "-x, --extensions [extensions]",
//   "List of extensions to compile when a directory has been input [.es6,.js,.es,.jsx,.mjs]",
//   collect,
// );
// commander.option(
//   "--keep-file-extension",
//   "Preserve the file extensions of the input files",
// );
// commander.option("-w, --watch", "Recompile files on changes");
// commander.option(
//   "--skip-initial-build",
//   "Do not compile files before watching",
// );
// commander.option(
//   "-o, --out-file [out]",
//   "Compile all input files into a single file",
// );
// commander.option(
//   "-d, --out-dir [out]",
//   "Compile an input directory of modules into an output directory",
// );
// commander.option(
//   "--relative",
//   "Compile into an output directory relative to input directory or file. Requires --out-dir [out]",
// );
// commander.option(
//   "-D, --copy-files",
//   "When compiling a directory copy over non-compilable files",
// );
// commander.option(
//   "--include-dotfiles",
//   "Include dotfiles when compiling and copying non-compilable files",
// );
// commander.option("--verbose", "Log everything");
// commander.option(
//   "--delete-dir-on-start",
//   "Delete the out directory before compilation",
// );

// commander.version(pkg.version + " (@babel/core test " + version  + ")");
// commander.usage("[options] <files ...>");

var argv = yargs.usage("[options] <files ...>")
.options({
  'filename': {
    description: 'filename to use when reading from stdin - this will be used in source-maps, errors etc',
    required: false,
    alias: 'f',
    type: 'string',
    example: '[filename]'
  },
  'presets': {
    description: 'comma-separated list of preset names',
    boolean: true,
    // alias: ''
  },
  'plugins': {
    description: 'comma-separated list of plugin names',
    boolean: true,
    // alias: 'p'
  },
  'config-file': {
    description: 'Path to a .babelrc file to use',
    boolean: true,
    alias: 'i'
  },
  'env-name': {
    description: "The name of the 'env' to use when loading configs and plugins. " +
      "Defaults to the value of BABEL_ENV, or else NODE_ENV, or else 'development'.",
    boolean: true,
    alias: 'i'
  },
  'config-file': {
    description: 'comma-separated list of plugin names',
    boolean: true,
  },
  'root-mode': {
    type: 'mode',
    description: "The project-root resolution mode. " +
      "One of 'root' (the default), 'upward', or 'upward-optional'.",
  },
  'source-type': {
    description: '',
    type: 'string'
  },
  'no-babelrc': {
    description: 'Whether or not to look up .babelrc and .babelignore files',
    boolean: true,
  },
  'ignore': {
    description: "list of glob paths to **only** compile",
  },
  'only': {
    description: "list of glob paths to **only** compile",
  },
  'no-highlight-code': {
    description: "enable/disable ANSI syntax highlighting of code frames (on by default)"
  },
  'no-comments': {
    description: "write comments to generated output (true by default)",
  },
  'retain-lines': {
    description: "retain line numbers - will result in really ugly code",
  },
  'compact': {
    description: "do not include superfluous whitespace characters and line terminators"
  },
  "minified": {
    description: "save as much bytes when printing [true|false]",
    boolean: true,
  },
  'auxiliary-comment-before': {
    description: "print a comment before any injected non-user code",
  },
  'source-maps': {
    description: ""
  },
  'source-map-target': {
    description: 'set `file` on returned source map'
  },
  'source-root': {
    description: "the root from which all sources are relative"
  },
  'module-root': {
    description: "optional prefix for the AMD module formatter that will be prepend to the filename on module definitions",
  },
  'module-ids': {
    alias: 'M',
    description: "insert an explicit id for modules"
  },
  'module-id': {
    description: "specify a custom name for module ids"
  },
  'extensions': {
    description: "List of extensions to compile when a directory has been input [.es6,.js,.es,.jsx,.mjs]",
    alias: 'x'
  },
  'keep-file-extension': {
    description: "Preserve the file extensions of the input files"
  },
  'watch': {
    alias: 'w',
    description: "Recompile files on changes"
  },
  'skip-initial-build': {
    description: "Do not compile files before watching",
  },
  'out-file': {
    alias: 'o',
    description: "Compile all input files into a single file",
  },
  'out-dir': {
    alias: 'd',
    description: "Compile an input directory of modules into an output directory",
  },
  'relative': {
    description: "Compile into an output directory relative to input directory or file. Requires --out-dir [out]",
  },
  'copy-files': {
    alias: 'D',
    description: "When compiling a directory copy over non-compilable files",
  },
  'include-dotfiles': {
    description: "Include dotfiles when compiling and copying non-compilable files",
  },
  'verbose': {
    description: "Log everything",
  },
  'delete-dir-on-start': {
    description: "Delete the out directory before compilation",
  }

}).strict().argv;

yargs.showHelp();


export type CmdOptions = {
  babelOptions: Object,
  cliOptions: Object,
};

export default function parseArgv(args: Array<string>): CmdOptions | null {
  //
  // commander.parse(args);
  const parsedArgs = yargs.parse(args);

  const errors = [];

  let filenames = parsedArgs._.reduce(function(globbed, input) {
    let files = glob.sync(input);
    if (!files.length) files = [input];
    return globbed.concat(files);
  }, []);

  filenames = uniq(filenames);

  filenames.forEach(function(filename) {
    if (!fs.existsSync(filename)) {
      errors.push(filename + " does not exist");
    }
  });

  if (parsedArgs.outDir && !parsedArgs.length) {
    errors.push("--out-dir requires filenames");
  }

  if (parsedArgs.outFile && parsedArgs.outDir) {
    errors.push("--out-file and --out-dir cannot be used together");
  }

  if (parsedArgs.relative && !parsedArgs.outDir) {
    errors.push("--relative requires --out-dir usage");
  }

  if (parsedArgs.watch) {
    if (!parsedArgs.outFile && !parsedArgs.outDir) {
      errors.push("--watch requires --out-file or --out-dir");
    }

    if (!parsedArgs.length) {
      errors.push("--watch requires filenames");
    }
  }

  if (parsedArgs.skipInitialBuild && !parsedArgs.watch) {
    errors.push("--skip-initial-build requires --watch");
  }
  if (parsedArgs.deleteDirOnStart && !parsedArgs.outDir) {
    errors.push("--delete-dir-on-start requires --out-dir");
  }

  if (
    !parsedArgs.outDir &&
    filenames.length === 0 &&
    !(parsedArgs.filename) &&
    parsedArgs.babelrc !== false
  ) {
    errors.push(
      "stdin compilation requires either -f/--filename [filename] or --no-babelrc",
    );
  }

  if (errors.length) {
    console.error("babel:");
    errors.forEach(function(e) {
      console.error(" " + e);
    });
    return null;
  }

  const opts = yargs.options().parsed.aliases;

  const babelOptions = {
    presets: opts.presets,
    plugins: opts.plugins,
    rootMode: opts.rootMode,
    configFile: opts.configFile,
    envName: opts.envName,
    sourceType: opts.sourceType,
    ignore: opts.ignore,
    only: opts.only,
    retainLines: opts.retainLines,
    compact: opts.compact,
    minified: opts.minified,
    auxiliaryCommentBefore: opts.auxiliaryCommentBefore,
    auxiliaryCommentAfter: opts.auxiliaryCommentAfter,
    sourceMaps: opts.sourceMaps,
    sourceFileName: opts.sourceFileName,
    sourceRoot: opts.sourceRoot,
    moduleRoot: opts.moduleRoot,
    moduleIds: opts.moduleIds,
    moduleId: opts.moduleId,

    // Commander will default the "--no-" arguments to true, but we want to
    // leave them undefined so that @babel/core can handle the
    // default-assignment logic on its own.
    babelrc: opts.babelrc === true ? undefined : opts.babelrc,
    highlightCode: opts.highlightCode === true ? undefined : opts.highlightCode,
    comments: opts.comments === true ? undefined : opts.comments,
  };

  // If the @babel/cli version is newer than the @babel/core version, and we have added
  // new options for @babel/core, we'll potentially get option validation errors from
  // @babel/core. To avoid that, we delete undefined options, so @babel/core will only
  // give the error if users actually pass an unsupported CLI option.
  for (const key of Object.keys(babelOptions)) {
    if (babelOptions[key] === undefined) {
      delete babelOptions[key];
    }
  }

  return {
    babelOptions,
    cliOptions: {
      filename: opts.filename,
      filenames,
      extensions: opts.extensions,
      keepFileExtension: opts.keepFileExtension,
      watch: opts.watch,
      skipInitialBuild: opts.skipInitialBuild,
      outFile: opts.outFile,
      outDir: opts.outDir,
      relative: opts.relative,
      copyFiles: opts.copyFiles,
      includeDotfiles: opts.includeDotfiles,
      verbose: opts.verbose,
      deleteDirOnStart: opts.deleteDirOnStart,
      sourceMapTarget: opts.sourceMapTarget,
    },
  };
}

function booleanify(val: any): boolean | any {
  if (val === "true" || val == 1) {
    return true;
  }

  if (val === "false" || val == 0 || !val) {
    return false;
  }

  return val;
}

function collect(value, previousValue): Array<string> {
  // If the user passed the option with no value, like "babel file.js --presets", do nothing.
  if (typeof value !== "string") return previousValue;

  const values = value.split(",");

  return previousValue ? previousValue.concat(values) : values;
}
