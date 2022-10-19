# filesystem-timestamp-modifier

This tool enables you to modify the timestamp of files on your macOS or Linux filesystem. Sometimes file modified timestamps are changed accidentally, even if you didn't make actual changes to the file, or if you made a change and then decided to undo it.  Timestamps add context to files, especially when searching for something you've recently modified or when sorting files from oldest last modified to latest modified.

## Installation

Install from the NPM registry as a global CLI tool:

```
$ npm i filesystem-timestamp-modifier -g
```

## Examples

Create a sample file called "testfile":

```
$ echo "hello world" > ./testfile && ls -lT ./testfile
```

It should now have whatever the current date and time is for the file's modified time. For example, if it's Sunday, October 9th at 9:50 PM, then you'll see this as the output:

```
-rw-r--r--  1 james  staff  12 Oct  9 21:50:14 2022 ./testfile
```

You can now try the examples below to modify the timestamp.


### Change timestamp of "testfile to September 2nd, 2021 at 9:02 PM local time.

```
$ lastmod --file ./testfile --time "September 2, 2021 9:09 PM"
```

Result:

```
$ ls -lT ./testfile 
-rw-r--r--  1 james  staff  12 Sep  2 21:09:00 2021 ./testfile
```

### Change timestamp of "testfile" to September 5th, 2021 at 8:01 PM local time.

```
$ lastmod --file ./testfile --time `node -p "new Date('September 5, 2021 8:01 PM').getTime()"`
```

This results in:

```
$ ls -lT ./timestamp
-rw-r--r--  1 james  staff  0 Sep  6 20:01:00 2021 ./testfile
```

## Use as a function in a Node.js codebase

This module can also be used locally inside a codebase. 

```
$ npm i filesystem-timestamp-modifier
```

Then use it like this:

```javascript
const updateFileTimestamps = require('filesystem-timestamp-modifier');
updateFileTimestamps('./testfile', new Date('September 5, 2021 8:01 PM').getTime());
```


## Contributing

### Cloning and setup

Clone the project and install dependencies:

```
$ npm i
```

Run the tests:

```
$ npm test
```

NOTE: If running from the source, replace "lastmod" with "node cli.js" in the examples section above.


### Run tests within Docker/Podman

`npm test` runs tests in the development OS, whatever OS you're running on. If making changes to the tests, it's helpful to verify they work in various shell environments. One way to quickly validate this is via container images.

To test on a specific Linux platform, substitute the container image tag with the IMAGE_TAG build-arg. For example, the two entries below show how to run the test on Alpine and Debian after first building test images:

Alpine Linux:
```
$ docker build --build-arg IMAGE_TAG=16.17.1-alpine3.15 -f Dockerfile -t alpine/lastmod .
$ docker run --rm -it alpine/lastmod
```

Debian:
```
$ docker build --build-arg IMAGE_TAG=lts-buster-slim -f Dockerfile -t debian/lastmod .
$ docker run --rm -it debian/lastmod
```


## License

Copyright (c) James Mortensen, 2022 MIT License

