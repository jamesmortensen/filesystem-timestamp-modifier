// help.js

const PACKAGE = require('../package.json');
const BINARY = Object.keys(PACKAGE.bin)[0];

console.log(`
Usage: 
    ${BINARY} -f|--file -t|--time [-h|--help] | [-v|--version]

    -f | --file        Filename or directory to modify last modified timestamp

    -t | --time        Timestamp, either a string "Month Day, Year HH:MM:SS", or a long integer

    -h | --help        Help (this output)

    -v | --version     Output version information

    `);
