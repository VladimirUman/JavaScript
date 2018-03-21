var http = require('http');
var fs = require('fs');
var html = fs.readFileSync('index.html');
var logFile = fs.openSync('log.txt', "w", 0644);

var server = http.createServer(function(req, res) {
  //console.log(req)
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(html);
  res.end();
  var now = new Date();
  var logs = now + '; Method: ' + req.method + '; Brouser: ' + req.rawHeaders[3] + ';\n'
  fs.writeSync(logFile, logs, null, 'ascii');
});

server.listen(3000);
