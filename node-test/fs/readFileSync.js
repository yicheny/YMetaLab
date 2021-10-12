const fs = require('fs')

const fd = fs.openSync('./test.txt');
const d = fs.readFileSync(fd,'utf-8')
console.log(d)
