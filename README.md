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
  - [listFiles(src, allowed_exts)](#listFiles)
  - [listImages(src)](#listImages)
  - [extract(src, dst, allow_subdir, allowed_exts)]()
  - [extractImages(src, dst, allow_subdir)]()

- ### `listFiles`
`<function>`
  - Return
    - `<Array <File>>` a list of `File` objects under the file system in the .eif file
  - Parameters
    - `src` `<string>` the path of the .eif file
    - `allowed_exts` `<Array <string>>` if provided, it lists only files with these file extensions; otherwise, all files are listed

- ### `listImages`
`<function>`
  - Return
    - `<Array <string>>` a list of images file

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
