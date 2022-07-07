var cities_code_list = ["0401","1301","1401","1701","2301","2601","2701","2801","3401","3701","4001","4002","4701","5101"];
var cities_code_dic = {'0401':"仙台", '1301':"東京", '1401':"横浜", '1701':"金沢", '2301':"名古屋", '2601':"京都", '2701':"大阪", '2801':"神戸", '3401':"広島", '3701':"高松", '4001':"北九州", '4002': "福岡", '4701':"沖縄", '5101':"札幌"};
var cities_color_dic = {'0401':"aqua", '1301':"blue", '1401':"fuchsia", '1701':"gray", '2301':"green", '2601':"lime", '2701':"maroon", '2801':"navy", '3401':"olive", '3701':"purple", '4001': "red", '4002':"silver", '4701':"teal", '5101':"yellow"};
var cities_length = cities_code_list.length;
var display_flags = {'0401':false, '1301':false, '1401':false, '1701':false, '2301':false, '2601':false, '2701':false, '2801':false, '3401':false, '3701':false, '4001':false, '4002': false, '4701':false, '5101':false};

var dataset = {};
var width = 800; // グラフの幅
var height = 500; // グラフの高さ
var margin = { "top": 30, "bottom": 60, "right": 40, "left": 60 };
var xScale, yScale;
var svg;
var tooltip;
var line_tokyo;
var line_yokohama;

var food_code = "30100"; //だいこん
//var food_code = "32400"; //うど(欠損値に対するテスト, 欠損大量)
//var food_code = "32300"; //ふき(欠損値に対するテスト, 欠損少量)

console.log("う")

/*       日本地図         */
var ja_width = 500;
var ja_height = 500;
const aryMax = function (a, b) {return Math.max(a, b);}
const aryMin = function (a, b) {return Math.min(a, b);}
var sizes = [];
var ja_svg;
console.log("いい");

/*
d3.select("#sapporo")
  .on("mouseover", function(d, i) {
    tooltip
      .style("visibility", "visible")
      .html("札幌");
  })
  .on("mousemove", function(d) {
    tooltip
      .style("top", (d.clientY -20) + "px")
      .style("left", (d.clientX + 10) + "px");
  })
  .on("mouseout", function(d) {
    tooltip.style("visibility", "hidden");
  });
*/
/*
d3.select(".btn btn--yellow btn--circle").on("click", function() {
  change_flags("5101");
  d3.select("#chart").remove();
  show_graph_all();
});
*/
d3.select("#sapporo").on("click", function() {
  change_flags("5101");
  d3.select("#chart").remove();
  show_graph_all();
});
d3.select("#sendai").on("click", function() {
  change_flags("0401");
  d3.select("#chart").remove();
  show_graph_all();
});
d3.select("#tokyo").on("click", function() {
  change_flags("1301");
  d3.select("#chart").remove();
  show_graph_all();
});
d3.select("#yokohama").on("click", function() {
  change_flags("1401");
  d3.select("#chart").remove();
  show_graph_all();
});
d3.select("#kanazawa").on("click", function() {
  change_flags("1701");
  d3.select("#chart").remove();
  show_graph_all();
});
d3.select("#nagoya").on("click", function() {
  change_flags("2301");
  d3.select("#chart").remove();
  show_graph_all();
});
d3.select("#kyoto").on("click", function() {
  change_flags("2601");
  d3.select("#chart").remove();
  show_graph_all();
});
d3.select("#osaka").on("click", function() {
  change_flags("2701");
  d3.select("#chart").remove();
  show_graph_all();
});
d3.select("#kobe").on("click", function() {
  change_flags("2801");
  d3.select("#chart").remove();
  show_graph_all();
});
d3.select("#hiroshima").on("click", function() {
  change_flags("3401");
  d3.select("#chart").remove();
  show_graph_all();
});
d3.select("#takamatsu").on("click", function() {
  change_flags("3701");
  d3.select("#chart").remove();
  show_graph_all();
});
d3.select("#kitakyusyu").on("click", function() {
  change_flags("4001");
  d3.select("#chart").remove();
  show_graph_all();
});
d3.select("#fukuoka").on("click", function() {
  change_flags("4002");
  d3.select("#chart").remove();
  show_graph_all();
});
d3.select("#okinawa").on("click", function() {
  change_flags("4701");
  d3.select("#chart").remove();
  show_graph_all();
});
d3.select("#allon").on("click", function() {
  change_flags("allon");
  d3.select("#chart").remove();
  show_graph_all();
});
d3.select("#alloff").on("click", function() {
  change_flags("alloff");
  d3.select("#chart").remove();
  show_graph_all();
});

function make_sizes() {
  d3.csv("./coordinates.csv").then(function(data) {
    data.forEach(function(d) {
      sizes.push(d.Size);
    })
  });
}

function make_ja_svg() {
  ja_svg = d3.select("body").append("svg")
    .attr("width", ja_width)
    .attr("height", ja_height)
    .attr("id", "map");
}

function draw_line_tokyo() {
  line_tokyo = d3.select("body").append("svg")
    .attr("width", ja_width)
    .attr("height", ja_height)
    .attr("id", "line_tokyo")
    .append("line")
    .attr("x1",285)
    .attr("x2",360)
    .attr("y1",216)
    .attr("y2",190)
    .attr("stroke-width",0.7)
    .attr("stroke","black");
}

function draw_line_yokohama() {
  line_yokohama = d3.select("body").append("svg")
    .attr("width", ja_width)
    .attr("height", ja_height)
    .attr("id", "line_yokohama")
    .append("line")
    .attr("x1",283)
    .attr("x2",360)
    .attr("y1",220)
    .attr("y2",155)
    .attr("stroke-width",0.7)
    .attr("stroke","black");
}

function draw_all_lines() {
  draw_line_tokyo();
  draw_line_yokohama();
}


function show_map() {
  //make_sizes();
  //make_ja_svg();
  //draw_all_lines();

  d3.json("./japan.topojson").then(function(data) {
    console.log("aa");
    var japan = topojson.feature(data, data.objects.japan);
    var projection = d3.geoMercator()
      .center([137, 34])
      .translate([ja_width/2, ja_height/2])
      .scale(Math.floor(1500*5/8)); //ここで日本地図の大きさを調整できる
    var path = d3.geoPath().projection(projection);
    ja_svg.selectAll("path")
      .data(japan.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", function(d) { return "rgb(229, 255, 188)" })
      .attr("stroke", "#333333")
      .attr("stroke-width", 0.5)

    /*
    console.log(japan);
    d3.csv("./coordinates.csv").then(function(data) {
        var sizeScale = d3.scaleLinear()
          .domain([sizes.reduce(aryMin), sizes.reduce(aryMax)])
          .range([5,5]);
        data.forEach(function(d) {                
            ja_svg.append("circle")
              .attr("r", sizeScale(d.Size))
              .attr("transform", function() { 
                var coord = projection([d.X, d.Y]);
                return "translate(" + coord.join(",") + ")"; 
              })
              .attr("fill", "rgba(0,0,255,1)");
        });
    });
    */
  });
}

function make_svg() {
  svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "chart");
  tooltip = d3.select("body").append("div")
    .attr("class", "tooltip");
}

function change_flags(selected_button) {
  if (selected_button == "allon") {
    for (var i = 0; i < cities_length; i++) display_flags[cities_code_list[i]] = true;
  }
  if (selected_button == "alloff") {
    for (var i = 0; i < cities_length; i++) display_flags[cities_code_list[i]] = false;
  }
  if (display_flags[selected_button] == true) display_flags[selected_button] = false;
  else display_flags[selected_button] = true;
}

function set_scale() {
  //開始・終了日付を見つける(より開始は古い日付にする)
  var start_day = new Date('2025-12-31');
  var end_day = new Date('2000-01-01');
  var all_false = true;
  for (var i = 0; i < cities_length; i++) {
    var city_code = cities_code_list[i];
    if (typeof dataset[food_code][city_code] == "undefined") continue;
    var selected_dataset = dataset[food_code][city_code];
    if (display_flags[city_code]) {
      all_false = false;
      var start_day_tmp = new Date(selected_dataset[0][0]);
      var end_day_tmp = new Date(selected_dataset[selected_dataset.length-1][0]);
      if (start_day > start_day_tmp) {
        start_day = start_day_tmp;
      }
      if (end_day < end_day_tmp) {
        end_day = end_day_tmp;
      }
    }
  }
  console.log(start_day, end_day);
  if (all_false) {
    start_day = end_day;
  }
  if (start_day != (new Date('2025-12-31'))) {
    console.log("dd");
    if (end_day == (new Date('2000-01-01'))) {
      console.log("yes");
      start_day = new Date("2000-04-05");
      end_day = new Date("2000-04-05");
    }
  }
  console.log(start_day, end_day);
  xScale = d3.scaleTime()
    .domain([start_day, end_day])
    .range([margin.left, width - margin.right]);
  
  //最小価格・最大価格を見つける
  var min_cost = 10000;
  var max_cost = -1;
  var offset = 5;
  for (var i = 0; i < cities_length; i++) {
    var city_code = cities_code_list[i];
    if (typeof dataset[food_code][city_code] == "undefined") continue;
    var selected_dataset = dataset[food_code][city_code];
    if (display_flags[city_code]) {
      for (var j = 0; j < selected_dataset.length; j++) {
        min_cost = Math.min(min_cost, selected_dataset[j][1]);
        max_cost = Math.max(max_cost, selected_dataset[j][1]);
      }
    }
  }
  yScale = d3.scaleLinear()
    .domain([Math.max(min_cost-offset, 0), max_cost+offset])
    .range([height - margin.bottom, margin.top]);
}

function show_axis() {
  var axis_x = d3.axisBottom(xScale)
    .ticks(d3.utcDay) //日本時間とグリニッジ時間を合わせる
    .tickFormat(d3.timeFormat("%y/%m/%d/%a"))
    .tickSize(-height + margin.bottom + margin.top);
  var axis_y = d3.axisLeft(yScale)
    .ticks(20)
    .tickSize(-width + margin.left + margin.right);
  svg.append("g")
    .attr("class", "x_axis")
    .attr("transform", "translate(" + 0 + "," + (height - margin.bottom) + ")")
    .call(axis_x)
    .append("text")
    .attr("fill", "black")
    .attr("x", (width - margin.left - margin.right) / 2 + margin.left)
    .attr("y", 35)
    .attr("text-anchor", "middle")
    .attr("font-size", "10pt")
    .attr("font-weight", "bold")
    .text("日付 [年/月/日/曜日]");
  svg.append("g")
    .attr("class", "y_axis")
    .attr("transform", "translate(" + margin.left + "," + 0 + ")")
    .call(axis_y)
    .append("text")
    .attr("fill", "black")
    .attr("text-anchor", "middle")
    .attr("x", -(height - margin.top - margin.bottom) / 2 - margin.top)
    .attr("y", -35)
    .attr("transform", "rotate(-90)")
    .attr("font-weight", "bold")
    .attr("font-size", "10pt")
    .text("価格 [円]");
}

function line_plot() {
  for (var i = 0; i < cities_length; i++) {
    var city_code = cities_code_list[i];
    if (typeof dataset[food_code][city_code] == "undefined") continue;
    var selected_dataset = dataset[food_code][city_code];
    if (display_flags[city_code] == false) continue;
    var path = svg.append("path")
      .datum(selected_dataset)
      .attr("fill", "none")
      .attr("stroke", cities_color_dic[city_code])
      .attr("stroke-width", 1.0)
      .attr("d", d3.line()
          .x(function(d) { return xScale(new Date(d[0])); })
          .y(function(d) { return yScale(d[1]); }));
    var path_length = path.node().getTotalLength(); //パスの長さ
    path.attr("stroke-dasharray", path_length + " " + path_length)
      .attr("stroke-dashoffset", path_length)
      .transition()
      .duration(500)
      .attr("ease", "linear")
      .attr("stroke-dashoffset", 0);
  }
}

function scatter_plot() {
  for (var i = 0; i < cities_length; i++) {
    var city_code = cities_code_list[i];
    if (typeof dataset[food_code][city_code] == "undefined") continue;
    var selected_dataset = dataset[food_code][city_code];
    if (display_flags[city_code] == false) continue;
    svg.append("g")
      .selectAll("circle")
      .data(selected_dataset)
      .enter()
      .append("circle")
      .attr("cx", function(d) { return xScale(new Date(d[0])); })
      .attr("cy", function(d) { return yScale(d[1]); })
      .attr("fill", cities_color_dic[city_code])
      .attr("r", 3)
      .on("mouseover", function(d, i) {
        tooltip
          .style("visibility", "visible")
          .html(i[0] + "<br>" + i[1] + "円");
      })
      .on("mousemove", function(d) {
        tooltip
          .style("top", (d.clientY -20) + "px")
          .style("left", (d.clientX + 10) + "px");
      })
      .on("mouseout", function(d) {
        tooltip.style("visibility", "hidden");
      });
  }
}

function show_graph_all() {
  make_svg();
  set_scale();
  show_axis();
  line_plot();
  scatter_plot();
}


//read from csvfile  ****( Must write d3.csv here, but I don't know why to do so. )****
d3.csv("./total2.csv").then(function(data){
  var products_list = [];
  data.forEach(function(d){
  if (products_list.indexOf(d["品目コード"]) == -1) {
    products_list.push(d["品目コード"]);
    dataset[d["品目コード"]] = {};
    dataset[d["品目コード"]][d["都市コード"]] = [[d['年']+'-'+d['月']+'-'+d["日"],d["価格"]/1]];
  }
  else {
    if (dataset[d["品目コード"]][d["都市コード"]] == null) {
      dataset[d["品目コード"]][d["都市コード"]] = [[d['年']+'-'+d['月']+'-'+d["日"],d["価格"]/1]];
    }
    else {
      dataset[d["品目コード"]][d["都市コード"]].push([d['年']+'-'+d['月']+'-'+d["日"],d["価格"]/1]);
      }
    }
  });
  //show_graph_all(); //初めは東京のみ表示
});
//console.log(dataset);
console.log("aa");
//show_map();
