function stackBar(rects) {
  var width = 1100,
      height = 700,
      padding = 250;
  //Create the SVG Viewport selection
  var svgContainer = d3.select("body").append("svg")
               .attr("width", width)
               .attr("height", height);

  //Create the Scale we will use for the Axis
  var xAxisScale = d3.scale.linear()
   .domain([2001, 2016])
   .range([0, 800]);
  //Create the Axis
  var xAxis = d3.svg.axis().orient("bottom").scale(xAxisScale);

  //Create an SVG group Element for the Axis elements and call the xAxis function
  var xAxisGroup = svgContainer.append("g").attr("transform", "translate(250," + (height - padding +10 + 150) + ")").call(xAxis);

  //Create the Scale we will use for the Axis
  var yAxisScale = d3.scale.linear()
   .domain([60000, 0])
   .range([0, 600]);
  //Create the Axis
  var yAxis = d3.svg.axis().orient("left").scale(yAxisScale);

  //Create an SVG group Element for the Axis elements and call the xAxis function
  var yAxisGroup = svgContainer.append("g").attr("transform", "translate("+padding+",10)").call(yAxis);

  // Define 'div' for tooltips
  var div = d3.select("body")
  .append("div")  // declare the tooltip div
  .attr("class", "tooltip")              // apply the 'tooltip' class
  .style("opacity", 0);                  // set the opacity to nil

  svgContainer.append("text")
          .attr("class", "yaxis_label")
          .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
          .attr("transform", "translate("+ (padding/2) +","+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
          .text("Number of Theft");

  svgContainer.append("text")
          .attr("class", "xaxis_label")
          .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
          .attr("transform", "translate("+ (width/2) +","+(height-40)+")")  // text is drawn off the screen top left, move down and out and rotate
          .text("Year");

  svgContainer.append("text")
          .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
          .attr("transform", "translate("+ (width/2) +","+(height-20)+")")  // text is drawn off the screen top left, move down and out and rotate
          .text("Theft Chart");

  svgContainer.selectAll("rect")
      .data(rects)
      .enter().append("rect")
      .attr("x", function(d) { return 250+((parseInt(d.Year)-2001)*(800/16)); })
      .attr("width", (800/16))
      .attr("y", function(d) { return 600-((d.Total/60000)*600)+10; })
      .attr("height", function(d) { return (parseInt(d.Value)/60000)*600; })
      .attr("stroke", "black")
      .attr("stroke-width", 0.5)
      .style("fill", function(d) { return d.Color; })
      .on("mouseover", function(d) {
            div.transition()
        .duration(500)
        .style("opacity", 0);
      div.transition()
        .duration(200)
        .style("opacity", .9);
      div	.html(
        d.Description +                         // closing </a> tag
        "<br/>"  + d.Value +
        "<br/>"  + d.Year)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
      });
}

function line(line1, line2, jsonPoints) {
  var width = 1000,
      height = 600,
      padding = 150;
  //Create the SVG Viewport selection
  var svgContainer = d3.select("body").append("svg")
               .attr("width", width)
               .attr("height", height);

  //Create the Scale we will use for the Axis
  var xAxisScale = d3.scale.linear()
   .domain([2001, 2016])
   .range([0, 800]);
  //Create the Axis
  var xAxis = d3.svg.axis().orient("bottom").scale(xAxisScale);

  //Create an SVG group Element for the Axis elements and call the xAxis function
  var xAxisGroup = svgContainer.append("g").attr("transform", "translate(150," + (height - padding +10) + ")").call(xAxis);

  //Create the Scale we will use for the Axis
  var yAxisScale = d3.scale.linear()
   .domain([24000, 0])
   .range([0, 400]);
  //Create the Axis
  var yAxis = d3.svg.axis().orient("left").scale(yAxisScale);

  //Create an SVG group Element for the Axis elements and call the xAxis function
  var yAxisGroup = svgContainer.append("g").attr("transform", "translate("+padding+",60)").call(yAxis);

  // Define 'div' for tooltips
  var div = d3.select("body")
  .append("div")  // declare the tooltip div
  .attr("class", "tooltip")              // apply the 'tooltip' class
  .style("opacity", 0);                  // set the opacity to nil

  svgContainer.append("text")
          .attr("class", "yaxis_label")
          .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
          .attr("transform", "translate("+ (padding/2) +","+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
          .text("No. of Assualt");

  svgContainer.append("text")
          .attr("class", "xaxis_label")
          .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
          .attr("transform", "translate("+ (width/2) +","+(height-80)+")")  // text is drawn off the screen top left, move down and out and rotate
          .text("Year");

  svgContainer.append("text")
          .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
          .attr("transform", "translate("+ (width/2) +","+(height-60)+")")  // text is drawn off the screen top left, move down and out and rotate
          .text("Arrested:Blue, Not-Arrested:Red");

  var lineFunction1 = d3.svg.line()
                          .x(function(d) { return 150+(d.Year-2001)*(800/15); })
                          .y(function(d) { return (400-((d.Value/24000)*400))+60; })
                          .interpolate("linear");

//The line SVG Path we draw
  var lineGraph1 = svgContainer.append("path")
                            .attr("d", lineFunction1(line1))
                            .attr("stroke", "blue")
                            .attr("stroke-width", 2)
                            .attr("fill", "none");

  var lineFunction2 = d3.svg.line()
                          .x(function(d) { return 150+(d.Year-2001)*(800/15); })
                          .y(function(d) { return (400-((d.Value/24000)*400))+60; })
                          .interpolate("linear");

  var lineGraph2 = svgContainer.append("path")
                            .attr("d", lineFunction2(line2))
                            .attr("stroke", "red")
                            .attr("stroke-width", 2)
                            .attr("fill", "none");

  svgContainer.selectAll("circle")
      .data(jsonPoints)
      .enter().append("circle")
      .attr("cx", function(d) { return 150+(d.Year-2001)*(800/15); })
      .attr("cy", function(d) { return (400-((d.Value/24000)*400))+60; })
      .attr("r", 3)
      .style("fill", "Black")
      .on("mouseover", function(d) {
            div.transition()
        .duration(500)
        .style("opacity", 0);
      div.transition()
        .duration(200)
        .style("opacity", .9);
      div	.html(
        d.Year + "<br/>" +
        "Arrested: "  + d.Arrest + "<br/>" +
        "No. of cases: " + d.Value
        )
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
      });
}

function pie(data) {
  var w = 400;
  var h = 500;
  var r = (h-100)/2;
  var color = d3.scale.category20c();

  var vis = d3.select('#chart').append("svg:svg").data([data]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");
  var pie = d3.layout.pie().value(function(d){return d.value;});

  // declare an arc generator function
  var arc = d3.svg.arc().outerRadius(r);

  // select paths, use arc generator to draw
  var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
  arcs.append("svg:path")
    .attr("fill", function(d, i){
        return color(i);
    })
    .attr("d", function (d) {
        // log the result of the arc generator to show how cool it is :)
        console.log(arc(d));
        return arc(d);
    });

  // add the text
  arcs.append("svg:text").attr("transform", function(d){
      d.innerRadius = 0;
      d.outerRadius = r;
    return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "middle").text( function(d, i) {
    return data[i].label+": "+data[i].value;}
    );
}
