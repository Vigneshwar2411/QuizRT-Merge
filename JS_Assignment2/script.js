var fs = require('fs'), readline = require('readline'), stream = require('stream');

var instream = fs.ReadStream('Crimes_-_2001_to_present.csv');
var outstream1 = fs.WriteStream('stack_bar.json');
outstream1.readable = true;
outstream1.writable = true;
var outstream2 = fs.WriteStream('line.json');
outstream2.readable = true;
outstream2.writable = true;
var outstream3 = fs.WriteStream('pie.json');
outstream3.readable = true;
outstream3.writable = true;
var headers = [];
var primaryType, description, year, arrest, indCount = 0, nonIndCount = 0, result11 = [], result12 = [], result21 = [], result22 = [];
var indexCrime = ["01A", "02", "03", "04A", "04B", "05", "06", "07", "09"];
var nonIndexCrime = ["01B", "08A", "08B", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "22", "24", "26"];

var rl = readline.createInterface({
  input: instream,
  terminal: false
});

rl.on('line', function(line) {
  if(headers.length==0) {
    headers=line.match(/("[^"']+"|[^,]+)/g);
    primaryType = headers.indexOf("Primary Type");
    description = headers.indexOf("Description");
    year = headers.indexOf("Year");
    arrest = headers.indexOf("Arrest");
    fbiCode = headers.indexOf("FBI Code");

    for(var i=2001;i<=2016;i++) {
      result11[i-2001] = {"Year":i, "Description":"OVER_$500", "Value":0, "Color":"Red", "Total":0};
      result12[i-2001] = {"Year":i, "Description":"$500 AND UNDER", "Value":0, "Color":"Blue", "Total":0};
      result21[i-2001] = {"Year":i, "Description":"ASSAULT", "Arrest":"true", "Value":0};
      result22[i-2001] = {"Year":i, "Description":"ASSAULT", "Arrest":"false", "Value":0};
    }
  }
  else {
	  var currentline = line.match(/("[^"']+"|[^,]+)/g);
    if(currentline[primaryType]==="THEFT" && parseInt(currentline[year])>=2001 && parseInt(currentline[year])<=2016 && (currentline[description]==="OVER $500" || currentline[description]==="$500 AND UNDER")) {
      if(currentline[description]==="OVER $500") {
        result11[parseInt(currentline[year])-2001].Value += 1;
      }
      if(currentline[description]==="$500 AND UNDER") {
        result12[parseInt(currentline[year])-2001].Value += 1;
      }
    }
    if(currentline[primaryType]==="ASSAULT" && parseInt(currentline[year])>=2001 && parseInt(currentline[year])<=2016) {
      if(currentline[arrest]=="true") {
        result21[parseInt(currentline[year])-2001].Value += 1;
      } else {
        result22[parseInt(currentline[year])-2001].Value += 1;
      }
    }
    if(indexCrime.indexOf(currentline[fbiCode])>=0 && parseInt(currentline[year])==2015) {
      indCount++;
    }
    if(nonIndexCrime.indexOf(currentline[fbiCode])>=0 && parseInt(currentline[year])==2015) {
      nonIndCount++;
    }
  }

}).on('close', () => {
  var result = [];
  for(var i=2001;i<=2016;i++) {
    result11[i-2001].Total = result11[i-2001].Value;
    result12[i-2001].Total = result11[i-2001].Value + result12[i-2001].Value;
    result.push(result11[i-2001]);
    result.push(result12[i-2001]);
  }
  outstream1.write(JSON.stringify(result));
  result = [];
  for(var i=2001;i<=2016;i++) {
    result.push(result21[i-2001]);
    result.push(result22[i-2001]);
  }
  outstream2.write(JSON.stringify(result));
  outstream3.write(JSON.stringify([{"label":"Index Crime", "value":indCount}, {"label":"Non-Index Crime", "value":nonIndCount}]));
});
