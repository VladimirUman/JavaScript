var fs = require('fs');
var html = fs.readFileSync('index.html');
module.exports = html;
