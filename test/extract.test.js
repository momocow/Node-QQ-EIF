const sinon = require('sinon')
const chai = require('chai')
const expect = chai.expect
const Buffer = require('buffer').Buffer
const fs = require('fs-extra')
const _ = require('lodash')
const path = require('path')

const eif = require('../lib/qq-eif')

console.log('Mocking #listFiles()')
let fake_files = fs.readJSONSync('./test/material/sample.json')
for(let file of fake_files){
  if(file.entry.content.type == "Buffer"){
    file.entry.content = Buffer.from(file.entry.content.data)
  }
}
sinon.stub(eif, 'listFiles').callsFake(function(src, allowed_exts = []){
  let valid_files = []
  for(let file of fake_files){
    if(_.size(allowed_exts) === 0 || _.indexOf(allowed_exts, path.extname(file.entry.name)) >= 0){
      valid_files.push(file)
    }
  }
  return valid_files
})


// chai plug-ins
chai.use(require('chai-fs'))

describe('#extract', function(){
  before(function(){
    fs.ensureDirSync('./test/tmp')
  })

  beforeEach(function(){
    fs.emptyDirSync('./test/tmp')
  })

  after(function(){
    fs.emptyDirSync('./test/tmp')
  })

  describe('(src=\'...\', dst=\'...\', allow_subdir=true, allowed_exts=[])', function(){
    it('should extract 3 files (\'1Vsersion.dat\', \'Face.dat\', \'Face2.dat\') and a sub-directory (\'2/\') with 2 files (\'HRK_YCZ8QC8$G7EQGL7IU}2.png\', \'HRK_YCZ8QC8$G7EQGL7IU}2fix.bmp\')', function(){
      eif.extract('./test/material/sample.eif', './test/tmp')

      expect('./test/tmp').to.be.a.directory().with.subDirs(['2'])
      expect('./test/tmp').files.have.lengthOf(3)
      expect('./test/tmp/1Vsersion.dat').to.be.a.file()
      expect('./test/tmp/Face.dat').to.be.a.file()
      expect('./test/tmp/Face2.dat').to.be.a.file()
      expect('./test/tmp/2').files.have.lengthOf(2)
      expect('./test/tmp/2/HRK_YCZ8QC8$G7EQGL7IU}2.png').to.be.a.file()
      expect('./test/tmp/2/HRK_YCZ8QC8$G7EQGL7IU}2fix.bmp').to.be.a.file()
    })
  })

  describe('(src=\'...\', dst=\'...\', allow_subdir=false, allowed_exts=[])', function(){
    it('should extract 5 files (\'1Vsersion.dat\', \'Face.dat\', \'Face2.dat\', \'HRK_YCZ8QC8$G7EQGL7IU}2.png\', \'HRK_YCZ8QC8$G7EQGL7IU}2fix.bmp\')', function(){
      eif.extract('./test/material/sample.eif', './test/tmp', false)

      expect('./test/tmp').to.be.a.directory().and.files.have.lengthOf(5)
      expect('./test/tmp').subDirs.have.lengthOf(0)
      expect('./test/tmp/1Vsersion.dat').to.be.a.file()
      expect('./test/tmp/Face.dat').to.be.a.file()
      expect('./test/tmp/Face2.dat').to.be.a.file()
      expect('./test/tmp/HRK_YCZ8QC8$G7EQGL7IU}2.png').to.be.a.file()
      expect('./test/tmp/HRK_YCZ8QC8$G7EQGL7IU}2fix.bmp').to.be.a.file()
      expect('./test/tmp/2').to.not.be.a.path()
    })
  })

  describe('(src=\'...\', dst=\'...\', allow_subdir=true, allowed_exts=[\'dat\'])', function(){
    it('should extract 3 files (\'1Vsersion.dat\', \'Face.dat\', \'Face2.dat\')', function(){
      eif.extract('./test/material/sample.eif', './test/tmp', true, ['.dat'])

      expect('./test/tmp').to.be.a.directory().and.files.have.lengthOf(3)
      expect('./test/tmp').subDirs.have.lengthOf(0)
      expect('./test/tmp/1Vsersion.dat').to.be.a.file()
      expect('./test/tmp/Face.dat').to.be.a.file()
      expect('./test/tmp/Face2.dat').to.be.a.file()
      expect('./test/tmp/2').to.not.be.a.path()
    })
  })
})

describe('#extractImages', function(){
  before(function(){
    fs.ensureDirSync('./test/tmp')
  })

  beforeEach(function(){
    fs.emptyDirSync('./test/tmp')
  })

  after(function(){
    fs.emptyDirSync('./test/tmp')
  })

  describe('(src=\'...\', dst=\'...\', allow_subdir = false)', function(){
    it('should extract 2 files (\'HRK_YCZ8QC8$G7EQGL7IU}2fix.bmp\', \'HRK_YCZ8QC8$G7EQGL7IU}2.png\')', function(){
      eif.extractImages('./test/material/sample.eif', './test/tmp', false)

      expect('./test/tmp').to.be.a.directory().and.files.have.lengthOf(2)
      expect('./test/tmp').subDirs.have.lengthOf(0)
      expect('./test/tmp/HRK_YCZ8QC8$G7EQGL7IU}2fix.bmp').to.be.a.file()
      expect('./test/tmp/HRK_YCZ8QC8$G7EQGL7IU}2.png').to.be.a.file()
      expect('./test/tmp/2').to.not.be.a.path()
    })
  })
})
