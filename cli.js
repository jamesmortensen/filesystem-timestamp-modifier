#!/usr/bin/env node

// cli.js

const args = require('argumently');

if(args.hasHelp())
    showHelpAndExit();

if(args.has('--version') || args.has('-v'))
    showVersionAndExit();

const file = args.has('--file') ? args.get('--file') : args.has('-f') ? args.get('-f') : null;
if(file == null) {
    console.error('--file argument required. Use -h for options.');
    process.exit(1);
}

if(file == '') {
    console.error('--file must include a filename or directory path. Use -h for options.');
    process.exit(1);
}

const lastModifiedTimeStr = args.has('--time') ? args.get('--time') : args.has('-t') ? args.get('-t') : null;
if(lastModifiedTimeStr == null) {
    console.error('--time argument required. Use -h for options.');
    process.exit(0);
}

console.log(`Changing last modified time for ${file} to ${lastModifiedTimeStr}`);
const lastModifiedTime = isNaN(parseInt(lastModifiedTimeStr)) ? new Date(lastModifiedTimeStr).getTime() : lastModifiedTimeStr;
console.log(`Changing last modified time for ${file} to ${lastModifiedTime}`);


if((args.has('--file') || args.has('-f')) && (args.has('--time') || args.has('-t')))
    applyModifiedTime(file, lastModifiedTime / 1);


function applyModifiedTime(file, lastModifiedTime) {
    const updateFileTimestamps = require('./src/filesystem-timestamp-modifier.js');
    updateFileTimestamps(file, lastModifiedTime);
}


function showHelpAndExit() {
    require('./src/help.js');
    process.exit(0);
}


function showVersionAndExit() {
    const PACKAGE = require('./package.json');
    const VERSION = `v${PACKAGE.version}`;
    console.log(VERSION);
    process.exit(0);
}
   
