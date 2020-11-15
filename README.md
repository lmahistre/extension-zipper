# Extension Zipper

Extension Zipper is a tool for automating compression of files into one or several archives.

## Installation and usage

Extension Zipper car be installed using npm:
```
$ npm install --save-dev extension-zipper
```

Then configuration must be set up in file package.json (see Configuration chapter).

After that, you can run Extension Zipper. You can either specify which archive to make:
```
$ ./node_modules/.bin/extension-zipper source
```

Or without parameter, to make all archives:
```
$ ./node_modules/.bin/extension-zipper
```

## Configuration

Configuration must be set up in file package.json, under `extensionZipperConfig` key. The configuration is an object where keys are the names of the packages and values their contents.

Example of configuration:
```
  "extensionZipperConfig": {
    "main": "dist",
    "source": [
      "src",
      ".gitignore",
      "package.json"
    ]
  }
```

Values can be either a string (like "main" in the example) or an array. If it is a string, the content of the specified folder will be used for the archive, or if it is a file, it will be the only file in the archive. If the value is an array, all its content (folders and files) will be added to the archive. 

## API

This tool can also be used programmatically.
```
const extensionZipper = require('extension-zipper');
```

### compress(fileName, elements)
* fileName : string
* elements : array or string

Creates an archive named 'fileName' and containing all the elements specified in 'elements'.

Returns a Promise.

### getConfig([configKey])
* configKey (optional): string

Returns the content of the configuration corresponding to the key 'configKey'. If 'configKey' is not specified, the whole configuration is returned.

### run([configKey])
* configKey (optional): string

Does the same as a call to extension-zipper on the command line. If a 'configKey' parameter is passed, the archive corresponding to this key in the configuration will be made.

Returns a Promise.
