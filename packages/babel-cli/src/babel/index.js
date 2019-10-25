#!/usr/bin/env node

import parseArgv from "./options";
import dirCommand from "./dir";
import fileCommand from "./file";
import yargs from 'yargs';


const opts = parseArgv(process.argv);

if (opts) {
  const fn = opts.cliOptions.outDir ? dirCommand : fileCommand;
  fn(opts).catch(err => {
    console.error(err, 'here');
    process.exitCode = 1;
  });
} else {
  process.exitCode = 2;
}
