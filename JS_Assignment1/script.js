var fs = require('fs'), readline = require('readline'), stream = require('stream');

var ASIAN_COUNTRIES = ["Afghanistan", "Bahrain", "Bangladesh", "Bhutan", "Myanmar", "Cambodia", "China", "India", "Indonesia", "Iraq", "Israel", "Japan", "Jordan", "Kazakhstan", "Lebanon", "Malaysia", "Maldives", "Mongolia", "Nepal",
"Oman", "Pakistan", "Philippines", "Qatar", "Saudi Arabia", "Singapore", "Sri Lanka", "Syrian Arab Republic", "Tajikistan", "Thailand", "Timor-Leste", "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen"];

var instream = fs.ReadStream('Indicators.csv');
var outstream1 = fs.WriteStream('ur_population.json');
outstream1.readable = true;
outstream1.writable = true;
var outstream2 = fs.WriteStream('urban_growth.json');
outstream2.readable = true;
outstream2.writable = true;
var outstream3 = fs.WriteStream('asian_countries.json');
outstream3.readable = true;
outstream3.writable = true;
var outstream4 = fs.WriteStream('asian_ur.json');
outstream4.readable = true;
outstream4.writable = true;
var headers = [];
var count1 = 0, count2 = 0, count3 = 0, count4 = 0;
var countryIndex, indicatorCodeIndex;

var rl = readline.createInterface({
  input: instream,
  terminal: false
});

rl.on('line', function(line) {
  if(count1==0) {
    headers=line.split(",");
    countryIndex = headers.indexOf("CountryName");
    indicatorCodeIndex = headers.indexOf("IndicatorCode");
    headers.push("Color");
    outstream1.write("[");
    outstream2.write("[");
    outstream3.write("[");
    outstream4.write("[");
    count1++;
    count2++;
    count3++;
    count4++;
  }
  else {
	  var currentline = line.replace('"Population,','"Population').replace('"Population ,','"Population').split(",");
    //India,IND,Urban population growth (annual %),SP.URB.GROW,1960,2.3379079247220598
    //China,CHN,"Population, total",SP.POP.TOTL,1960,667070000.0
    if(currentline[countryIndex]==="India" && (currentline[indicatorCodeIndex]==="SP.RUR.TOTL.ZS" || currentline[indicatorCodeIndex]==="SP.URB.TOTL.IN.ZS")) {
      count1 = writeToFile(currentline,outstream1,count1);
    } else if(currentline[countryIndex]==="India" && currentline[indicatorCodeIndex]==="SP.URB.GROW") {
      count2 = writeToFile(currentline,outstream2,count2);
    } else if(currentline[indicatorCodeIndex]==="SP.POP.TOTL") {
      var condition = false;
      for(var i=0;i<ASIAN_COUNTRIES.length;i++) {
        if(currentline[countryIndex]===ASIAN_COUNTRIES[i]) {
          condition = true;
          break;
        }
      }
      if(condition) {
        count3 = writeToFile(currentline,outstream3,count3);
      }
    } else if(currentline[indicatorCodeIndex]==="SP.RUR.TOTL" || currentline[indicatorCodeIndex]==="SP.URB.TOTL") {
      var condition = false;
      for(var i=0;i<ASIAN_COUNTRIES.length;i++) {
        if(currentline[countryIndex]===ASIAN_COUNTRIES[i]) {
          condition = true;
          break;
        }
      }
      if(condition) {
        count4 = writeToFile(currentline,outstream4,count4);
      }
    }
  }
  //rl.prompt();
}).on('close', () => {
  console.log(count1+" "+count2+" "+count3+" "+count4);
  console.log(ASIAN_COUNTRIES.length);
  outstream1.write("]");
  outstream2.write("]");
  outstream3.write("]");
  outstream4.write("]");
});

function writeToFile(currentline,outstream,count) {
  var obj = {};
  for(var i=0;i<currentline.length;i++){
    obj[headers[i]] = currentline[i];
  }

  if(count==1) {
    outstream.write(JSON.stringify(obj));
  } else {
    outstream.write(","+JSON.stringify(obj));
  }

  count++;
  return count;
}
