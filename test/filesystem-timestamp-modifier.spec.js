// filesystem-timestamp-modifier.spec.js

const { expect } = require('chai');

describe('filesystem-timestamp-modifier tests', () => {

    const fs = require('fs');
    const updateFileTimestamps = require('../src/filesystem-timestamp-modifier.js');

    it('should change the date and time for a testfile', () => {
        const testFilePath = '/tmp/testfile2';
        fs.writeFileSync(testFilePath, 'helloworld');
        updateFileTimestamps(testFilePath, new Date('September 5th, 2021').getTime());
        const stats = fs.statSync(testFilePath)
        console.log(stats.mtime);
        fs.unlinkSync(testFilePath);
    });
});
