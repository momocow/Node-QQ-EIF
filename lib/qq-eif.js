const EIF = module.exports = {
	extractImages,
	extract,
	listImages,
	listFiles
}

const path = require('path')
const _ = require('lodash')
const fs = require('fs-extra')
const CFB = require('./cfb-fixed')

const IMG_EXT = ['.bmp', '.jpg', '.gif', '.png']

function extractImages(src, dst, allow_subdir = true){
	EIF.extract(src, dst, allow_subdir, IMG_EXT)
}

function extract(src, dst, allow_subdir = true, allowed_exts = []){
	for(let zipped_file of EIF.listFiles(src, allowed_exts)){
		let local_path = zipped_file.path.replace(/^Root Entry\//, '')
		if(!allow_subdir){
			local_path = path.basename(local_path)
		}

		let entry_file = path.join(dst, local_path)
		fs.ensureFileSync(entry_file)
		fs.writeFileSync(entry_file, zipped_file.entry.content||'')
	}
}

function listImages(src){
	return EIF.listFiles(src, IMG_EXT)
}

function listFiles(src, allowed_exts=[]){
	let eif = CFB.read(src, {type: 'file'})
	let valid_paths = []
	let valid_content = eif.FileIndex.filter((e, i)=>{
		if(e.size > 0){
			valid_paths.push(eif.FullPaths[i])
			return true
		}
		return false
	})

	let file_list = [];
	for(let idx in valid_content){
		let entry = valid_content[idx]
		if(entry.type == 2 && (!allowed_exts || _.indexOf(allowed_exts, path.extname(entry.name)) >= 0)){
			file_list.push({path: valid_paths[idx], entry: entry})
		}
	}

	return file_list
}
