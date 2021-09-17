const path = require('path')

class PathEnhance{
    get root(){
        return process.cwd()
    }

    getAbsoluteFilePath(filePath){
        return path.join(this.root,filePath)
    }
}

const pathEnhance = new PathEnhance();
module.exports = pathEnhance;
