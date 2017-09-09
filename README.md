# Node-QQ-EIF
NodeJS utilities for EIF file format of Tecent QQ faces

## Installation
- Download from github
    - In the `node_module/` directory, use `git clone https://github.com/momocow/Node-QQ-EIF.git` to download source codes
    - In the `Node-QQ-EIF/` directory you just cloned, run `npm install`
- ~~Download from npm repository~~ (currently not published yet)
    - ~~`npm install qq-eif --save`~~

## Usage
- In your code, use `const eif = require('qq-eif')` to access exported
methods

## Documentation
- ### Methods
  - [listFiles(src, allowed_exts)](#listfiles)
  - [listImages(src)](#listimages)
  - [extract(src, dst, allow_subdir, allowed_exts)](#extract)
  - [extractImages(src, dst, allow_subdir)](#extractimages)

- ### Objects
  - [File](#file)

- ### `listFiles`
`<function>`
  - Return
    - `<Array <File>>` a list of [`File`](#file) objects under the file system in the .eif file
  - Parameters
    - `src` `<string>` the path of the .eif file
    - `allowed_exts` `<Array <string>>` if provided, it lists only files with these file extensions; otherwise, all files are listed

- ### `listImages`
`<function>`
  - Return
    - `<Array <string>>` a list of images file
  - Parameters
    - `src` `<string>` the path of the .eif file
  - File extensions of images: `['.bmp', '.jpg', '.gif', '.png']`

- ### `extract`
`<function>` *`#side-effect`*
  - Extract files from the .eif file
  - Parameters
    - `src` `<string>` the path of the .eif file
    - `dst` `<string>` the directory to contain extracted files and sub-directories
    - `allow_subdir` `<boolean>` keep the fs structure in the .eif file or not; if false, all files are extracted to the `dst` directory without creating sub-directories
    - `allowed_exts` `<Array <string>>` if provided, it lists only files with these file extensions; otherwise, all files are listed

- ### `extractImages`
`<function>` *`side-effect`*
  - Extract images from the .eif file
  - Parameters
    - `src` `<string>` the path of the .eif file
    - `dst` `<string>` the directory to contain extracted files and sub-directories
    - `allow_subdir` `<boolean>` keep the fs structure in the .eif file or not; if false, all files are extracted to the `dst` directory without creating sub-directories
    - File extensions of images: `['.bmp', '.jpg', '.gif', '.png']`

- ### `File`
`<object>`
  - Property
    - `path` `<string>` the absolute path under the file system of the .eif file, starting with `Root Entry/...`
    - `entry` `<object>` referred to the [Compound File Binary Format (CFBF)](https://en.wikipedia.org/wiki/Compound_File_Binary_Format)
      - `name` `<string>`
      - `type` `<int>`
      - `color` `<int>`
      - `L` `<int>`
      - `R` `<int>`
      - `C` `<int>`
      - `clsid` `<string>`
      - `state` `<int>`
      - `start` `<int>`
      - `size` `<int>`
      - `storage` `<string>`
      - `content` `<Buffer>`
