// last-modifier.js

function updateFileTimestamps(resourcePath, lastEditedDateStr) {
    lastEditedDateStr = lastEditedDateStr || new Date().getTime();
    const modifiedDateTime = new Date(
        new Date(lastEditedDateStr).getTime() //+ 63000000
    ).getTime() / 1000;
    attachModifiedTimeAndCreatedTime(resourcePath, modifiedDateTime, modifiedDateTime);
}

function attachModifiedTimeAndCreatedTime(resourceName, modified, created) {
    // https://nodejs.org/api/fs.html#fs_fspromises_lutimes_path_atime_mtime
    // access time then modified time - modified is the important date shown in ls
    // but it is actually access time that Quip is giving for modified time.
    const fs = require('fs');
    // to apply access times to files/folders
    fs.utimesSync(`${resourceName}`, created, modified)
}


module.exports = updateFileTimestamps;

