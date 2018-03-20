var http = require('http');
var fs = require('fs');
var html = fs.readFileSync('index.html');
var flogs = 'server.log';
var count = 0;
//var logs = ('line: ' + count + '\n');
var logFile = fs.openSync(flogs, "w", 0644);

var server = http.createServer(function(req, res) {
  //console.log(req)
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(html);
  res.end();
  count += 1;
  var logs = 'line: ' + count + '\n'
  fs.writeSync(logFile, logs, null, 'ascii');
});

server.listen(3000);
