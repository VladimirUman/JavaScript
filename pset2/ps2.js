var fs = require('fs');
var fname = 'example.in';

var ridesInfo = fs.readFileSync(fname).toString().split('\n');
var ways = [];
var cars = [];

var mainLine = ridesInfo[0].split(' ');
var rows = Number(mainLine[0]);
var columns = Number(mainLine[1]);
var numberOfCars = Number(mainLine[2]);
var rides = Number(mainLine[3]);
var bonus = Number(mainLine[4]);
var numberOfSteps = Number(mainLine[5]);

for (i = 1; i < ridesInfo.length - 1; i++) {
  ways[i-1] = {
    orderId: i-1,
    startX: Number(ridesInfo[i].split(' ')[0]),
    startY: Number(ridesInfo[i].split(' ')[1]),
    endX: Number(ridesInfo[i].split(' ')[2]),
    endY: Number(ridesInfo[i].split(' ')[3]),
    start: Number(ridesInfo[i].split(' ')[4]),
    finish: Number(ridesInfo[i].split(' ')[5]),
    len: Math.abs(ridesInfo[i].split(" ")[0] - ridesInfo[i].split(" ")[2]) + Math.abs(ridesInfo[i].split(" ")[1] - ridesInfo[i].split(" ")[3]),
    complite: false
  }
}

for (i = 0; i < numberOfCars; i++) {
  cars[i] = {
    carId: i + 1,
    carX: 0,
    carY: 0,
    busy: 0,
    orders: []
  }
}

for (s = 0; s < numberOfSteps; s++) {
  for (j = 0; j < cars.length; j++) {
    if (cars[j].busy == 0) {
      var bestLen = [];
      var bestLenOrder = [];
      for (i = 0; i < ways.length; i++) {
        if (ways[i].complite == false) {
          var lenWay = Math.abs(cars[j].carX - ways[i].startX) + Math.abs(cars[j].carY - ways[i].startY) + ways[i].start;
          bestLen.push(lenWay);
          bestLenOrder.push(i);
        }
      }
      var bestOrderIndex = bestLen.indexOf(Math.min.apply(null, bestLen));
      var bestOrder = bestLenOrder[bestOrderIndex];
      var min = Math.min.apply(null, bestLen);
      if (bestOrder != null && min <= ways[bestOrder].finish) {
        cars[j].busy = min + ways[bestOrder].len;
        cars[j].carX = ways[bestOrder].endX;
        cars[j].carY = ways[bestOrder].endY;
        ways[bestOrder].complite = true;
        ways[bestOrder].carId = cars[j].carId;
        cars[j].orders.push(ways[bestOrder].orderId);
      }
    } else {
      cars[j].busy -= 1
    }
  }
}

var carResult = [];
for (i = 0; i < cars.length; i++) {
  carResult.push('\n' + cars[i].carId);
  carResult.push(cars[i].orders.join(' '));
}

result = carResult.join(' ').slice(1);
console.log(result);
var fname = 'example.out';
fs.open(fname, "w+", 0644, function(err, file_handle) {
	if (!err) {
	    fs.write(file_handle, result, null, 'ascii', function(err, written) {
	        if (!err) {
	            console.log("Succesfully writen");
	        } else {
	            console.log("Error!");
	        }
	    });
	} else {
		console.log("Open file error!");
	}
});
