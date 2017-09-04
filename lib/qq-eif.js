module.exports = {
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

function extractImages(eif_path, dst_dir){
	extract(eif_path, dst_dir, IMG_EXT)
}

function extract(eif_path, dst_dir, allowed_file_exts){
	for(let zipped_file of listFiles(eif_path, allowed_file_exts)){
		let local_path = zipped_file.path.replace(/^Root Entry\//, '')
		let entry_file = path.join(dst_dir, local_path)
		fs.ensureFileSync(entry_file)
		fs.writeFileSync(entry_file, zipped_file.entry.content||'')
	}
}

function listImages(eif_path){
	return listFiles(eif_path, IMG_EXT)
}

function listFiles(eif_path, allowed_file_exts){
	let eif = CFB.read(eif_path, {type: 'file'})
	let valid_paths = []
	let valid_content = eif.FileIndex.filter((e, i)=>{
		if(e.size > 0){
			valid_paths.push(eif.FullPaths[i])
			return true
		}
		return false
	})
	
	let img_list = [];
	for(let idx in valid_content){
		let entry = valid_content[idx]
		if(entry.type == 2 && (!allowed_file_exts || _.indexOf(allowed_file_exts, path.extname(entry.name)) >= 0)){
			img_list.push({path: valid_paths[idx], entry: entry})
		}
	}
	
	return img_list
}