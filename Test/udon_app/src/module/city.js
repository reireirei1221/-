import React, { Component } from 'react'
import * as d3 from 'd3';
import "../css/city.css"

var display_flags = {'0401':false, '1301':false, '1401':false, '1701':false, '2301':false, '2601':false, '2701':false, '2801':false, '3401':false, '3701':false, '4001':false, '4002': false, '4701':false, '5101':false};
var cities_color_string_on =  {'0401':"black", '1301':"white", '1401':"white", '1701':"white", '2301':"white", '2601':"black", '2701':"white", '2801':"white", '3401':"white", '3701':"white", '4001':"white", '4002': "white", '4701':"white", '5101':"black"};
var cities_color_string_off =  {'0401':"black", '1301':"black", '1401':"black", '1701':"black", '2301':"black", '2601':"black", '2701':"black", '2801':"black", '3401':"black", '3701':"black", '4001':"black", '4002': "black", '4701':"black", '5101':"black"};
var colorBase = "silver";

class City extends Component {
    constructor(props){
      super(props)
      this.createCityGraph = this.createCityGraph.bind(this)
    }
  
    componentDidMount() {
      this.createCityGraph()
    }
    componentDidUpdate() {
      this.createCityGraph()
    }
  
    createCityGraph(food_code=this.props.food_code) {
        const node = this.node;

        var cities_code_list = ["0401","1301","1401","1701","2301","2601","2701","2801","3401","3701","4001","4002","4701","5101"];
        var cities_code_dic = {'0401':"仙台", '1301':"東京", '1401':"横浜", '1701':"金沢", '2301':"名古屋", '2601':"京都", '2701':"大阪", '2801':"神戸", '3401':"広島", '3701':"高松", '4001':"北九州", '4002': "福岡", '4701':"沖縄", '5101':"札幌"};
        var cities_code_dic2 = {'0401':"sendai", '1301':"tokyo", '1401':"yokohama", '1701':"kanazawa", '2301':"nagoya", '2601':"kyoto", '2701':"osaka", '2801':"kobe", '3401':"hiroshima", '3701':"takamatsu", '4001':"kitakyusyu", '4002': "fukuoka", '4701':"okinawa", '5101':"sapporo"};
        var cities_color_dic = {'0401':"aqua", '1301':"blue", '1401':"fuchsia", '1701':"gray", '2301':"green", '2601':"lime", '2701':"maroon", '2801':"navy", '3401':"olive", '3701':"purple", '4001': "red", '4002':"silver", '4701':"teal", '5101':"yellow"};
        var cities_length = cities_code_list.length;
        // var display_flags = {'0401':false, '1301':false, '1401':false, '1701':false, '2301':false, '2601':false, '2701':false, '2801':false, '3401':false, '3701':false, '4001':false, '4002': false, '4701':false, '5101':false};

        var dataset = {};
        var width = 700; // グラフの幅
        var height = 400; // グラフの高さ
        var changed; //グラフ描画モーションを行うグラフを制御(都市コード)
        var margin = { "top": 30, "bottom": 60, "right": 40, "left": 60 };

        var xScale, yScale;
        var start_day, end_day;
        var svg = d3.select(node).attr("width", width).attr("height", height);
        var tooltip;

        //var food_code = "30100"; //だいこん
        //var food_code = "32400"; //うど(欠損値に対するテスト, 欠損大量)
        //var food_code = "32300"; //ふき(欠損値に対するテスト, 欠損少量)

        d3.select("#sapporo").on("click", function() {
          change_flags("5101");
          if (display_flags["5101"]) {
              this.style.backgroundColor = cities_color_dic["5101"];
              this.style.opacity = 0.9;
          } else {
              this.style.backgroundColor = colorBase;
              this.style.opacity = 1.0;
          }
          d3.select("#chart").remove();
          show_graph_all();
        });
        d3.select("#sendai").on("click", function() {
          change_flags("0401");
          if (display_flags["0401"]) {
            this.style.backgroundColor = cities_color_dic["0401"];
            this.style.opacity = 0.9;
          } else {
            this.style.backgroundColor = colorBase;
            this.style.opacity = 1.0;
          }
          d3.select("#chart").remove();
          show_graph_all();
        });
        d3.select("#tokyo").on("click", function() {
          change_flags("1301");
          if (display_flags["1301"]) {
            this.style.backgroundColor = cities_color_dic["1301"];
            this.style.color = "white";
            this.style.opacity = 0.9
          } else {
            this.style.backgroundColor = colorBase;
            this.style.color = "black";
            this.style.opacity = 1.0
          }
          d3.select("#chart").remove();
          show_graph_all();
        });
        d3.select("#yokohama").on("click", function() {
          change_flags("1401");
          if (display_flags["1401"]) {
            this.style.backgroundColor = cities_color_dic["1401"];
            this.style.color = "white";
            this.style.opacity = 0.9
          } else {
            this.style.backgroundColor = colorBase;
            this.style.color = "black";
            this.style.opacity = 1.0
          }
          d3.select("#chart").remove();
          show_graph_all();
        });
        d3.select("#kanazawa").on("click", function() {
          change_flags("1701");
          if (display_flags["1701"]) {
            this.style.backgroundColor = cities_color_dic["1701"];
            this.style.color = "white";
            this.style.opacity = 0.9
          } else {
            this.style.backgroundColor = colorBase;
            this.style.color = "black";
            this.style.opacity = 1.0
          }
          d3.select("#chart").remove();
          show_graph_all();
        });
        d3.select("#nagoya").on("click", function() {
          change_flags("2301");
          if (display_flags["2301"]) {
            this.style.backgroundColor = cities_color_dic["2301"];
            this.style.color = "white";
            this.style.opacity = 0.9;
          } else {
            this.style.backgroundColor = colorBase;
            this.style.color = "black";
            this.style.opacity = 1.0;
          }
          d3.select("#chart").remove();
          show_graph_all();
        });
        d3.select("#kyoto").on("click", function() {
          change_flags("2601");
          if (display_flags["2601"]) {
            this.style.backgroundColor = cities_color_dic["2601"];
            // this.style.color = "white";
            this.style.opacity = 0.9;
          } else {
            this.style.backgroundColor = colorBase;
            // this.style.color = "black";
            this.style.opacity = 1.0;
          }
          d3.select("#chart").remove();
          show_graph_all();
        });
        d3.select("#osaka").on("click", function() {
          change_flags("2701");
          if (display_flags["2701"]) {
            this.style.backgroundColor = cities_color_dic["2701"];
            this.style.color = "white";
            this.style.opacity = 0.9;
          } else {
            this.style.backgroundColor = colorBase;
            this.style.color = "black";
            this.style.opacity = 1.0;
          }
          d3.select("#chart").remove();
          show_graph_all();
        });
        d3.select("#kobe").on("click", function() {
          change_flags("2801");
          if (display_flags["2801"]) {
            this.style.backgroundColor = cities_color_dic["2801"];
            this.style.color = "white";
            this.style.opacity = 0.9;
          } else {
            this.style.backgroundColor = colorBase;
            this.style.color = "black";
            this.style.opacity = 1.0;
          }
          d3.select("#chart").remove();
          show_graph_all();
        });
        d3.select("#hiroshima").on("click", function() {
          change_flags("3401");
          if (display_flags["3401"]) {
            this.style.backgroundColor = cities_color_dic["3401"];
            this.style.color = "white";
            this.style.opacity = 0.9;
          } else {
            this.style.backgroundColor = colorBase;
            this.style.color = "black";
            this.style.opacity = 1.0;
          }
          d3.select("#chart").remove();
          show_graph_all();
        });
        d3.select("#takamatsu").on("click", function() {
          change_flags("3701");
          if (display_flags["3701"]) {
            this.style.backgroundColor = cities_color_dic["3701"];
            this.style.color = "white";
            this.style.opacity = 0.9;
          } else {
            this.style.backgroundColor = colorBase;
            this.style.color = "black";
            this.style.opacity = 1.0;
          }
          d3.select("#chart").remove();
          show_graph_all();
        });
        d3.select("#kitakyusyu").on("click", function() {
          change_flags("4001");
          if (display_flags["4001"]) {
            this.style.backgroundColor = cities_color_dic["4001"];
            this.style.color = "white";
            this.style.opacity = 0.9;
          } else {
            this.style.backgroundColor = colorBase;
            this.style.color = "black";
            this.style.opacity = 1.0;
          }
          d3.select("#chart").remove();
          show_graph_all();
        });
        d3.select("#fukuoka").on("click", function() {
          change_flags("4002");
          if (display_flags["4002"]) {
            this.style.backgroundColor = cities_color_dic["4002"];
            this.style.color = "white";
            this.style.opacity = 0.9;
          } else {
            this.style.backgroundColor = colorBase;
            this.style.color = "black";
            this.style.opacity = 1.0;
          }
          d3.select("#chart").remove();
          show_graph_all();
        });
        d3.select("#okinawa").on("click", function() {
          change_flags("4701");
          if (display_flags["4701"]) {
            this.style.backgroundColor = cities_color_dic["4701"];
            this.style.color = "white";
            this.style.opacity = 0.9;
          } else {
            this.style.backgroundColor = colorBase;
            this.style.color = "black";
            this.style.opacity = 1.0;
          }
          d3.select("#chart").remove();
          show_graph_all();
        });
        d3.select("#allon").on("click", function() {
          change_flags("allon");
          for (var i=0; i<cities_code_list.length; i++) {
            //   console.log(cities_code_dic2[cities_code_list[i]])
              var tag = document.getElementById(cities_code_dic2[cities_code_list[i]]);
            //   console.log(tag);
              tag.style.backgroundColor = cities_color_dic[cities_code_list[i]];
              tag.style.opacity = 0.9;
              tag.style.color = cities_color_string_on[cities_code_list[i]];
          }
          d3.select("#chart").remove();
          show_graph_all();
        });
        d3.select("#alloff").on("click", function() {
          change_flags("alloff");
          for (var i=0; i<cities_code_list.length; i++) {
              var tag = document.getElementById(cities_code_dic2[cities_code_list[i]]);
              tag.style.backgroundColor = "silver";
              tag.style.opacity = 0.9;
              tag.style.color = cities_color_string_off[cities_code_list[i]];
          }
          d3.select("#chart").remove();
          show_graph_all();
        });

        function make_svg() {
          svg = d3.select(node).append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("id", "chart");
          tooltip = d3.select("body").append("div")
            .attr("class", "tooltip");
        }

        function change_flags(selected_button) {
          if (selected_button == "allon") {
            changed = "allon"; //追加
            for (var i = 0; i < cities_length; i++) display_flags[cities_code_list[i]] = true;
          }
          if (selected_button == "alloff") {
            changed = "nothing"; //追加
            for (var i = 0; i < cities_length; i++) display_flags[cities_code_list[i]] = false;
          }
          if (display_flags[selected_button] == true) {
            changed = "nothing"; //追加
            display_flags[selected_button] = false;
          }
          else {
            changed = selected_button; //追加
            display_flags[selected_button] = true;
          }
        }

        function set_scale() {
          //開始・終了日付を見つける(より開始は古い日付にする)
          start_day = new Date('2025-12-31');
          end_day = new Date('2000-01-01');
          var all_false = true;
          console.log("dataset", dataset)
          console.log("food_code",food_code)
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
          if (all_false) { //グラフに何も表示されない時(計算量短縮)
            start_day = end_day;
          }
          xScale = d3.scaleTime()
            .domain([set_time(start_day), set_time(end_day)])
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

        function set_time(date) {
          return date.setHours(date.getHours() - 9);
        }

        function tick_distance(start_day, end_day) {
          var diff = end_day.getTime() - start_day.getTime();
          diff /= (1000*60*60*24);
          return Math.floor(diff/8);
        }

        //折れ線グラフ用
        /* 
        diff = 0だと無限ループ問題 
        diff = 1, 15日だと15メモリ,
        diff = 2, 23日だと11メモリ,
        diff = 3, 31日だと10メモリ,
        diff = 4, 39だだと9メモリ
        */
        function make_ticks(start_day, end_day) {
          var xVales = [];
          //var diff = tick_distance(start_day, end_day);
          var diff = adjust_diff(start_day, end_day, tick_distance(start_day, end_day));
          var now = start_day.toString();
          now = new Date(now);
          while (now <= end_day) {
            xVales.push(now.toString());
            now.setDate(now.getDate() + diff);
          }
          var res = [];
          for (var i = 0; i < xVales.length; i++) {
            res.push(new Date(xVales[i]));
          }
          return res;
        }

        function adjust_diff(start_day, end_day, diff) {
          if (diff == 0) return 1;
          else if (diff == 1) {
            var diff2 = end_day.getTime() - start_day.getTime();
            diff2 /= (1000*60*60*24);
            if (diff2 >= 10) return 2;
          }
          else if (diff == 2) {
            var diff2 = end_day.getTime() - start_day.getTime();
            diff2 /= (1000*60*60*24);
            if (diff2 >= 20) return 3;
          }
          else if (diff == 3) {
            var diff2 = end_day.getTime() - start_day.getTime();
            diff2 /= (1000*60*60*24);
            if (diff2 >= 30) return 4;
          }
          return diff;
        }

        function show_axis() {
          var axis_x = d3.axisBottom(xScale)
            .tickValues(make_ticks(start_day, end_day))
            //.ticks(d3.timeDay.every(tick_distance(start_day,end_day))) //日本時間とグリニッジ時間を合わせる //d3.utcDay //自動的に目盛り数が8くらいになるように飛ばす間隔を調整
            .tickFormat(d3.timeFormat("%m/%d/%a"))
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
            .text("日付 [月/日/曜日]");
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
                  .x(function(d) { return xScale(set_time(new Date(d[0]))); }) //(new Date(d3.utcDay(new Date(tmp(d)))))
                  .y(function(d) { return yScale(d[1]); }));
            /* 追加 */
            if (changed == "nothing") continue;
            else if (changed != "allon") {
              if (changed != city_code) continue;
            }
            /* 追加終わり */
            var path_length = path.node().getTotalLength(); //パスの長さ
            path.attr("stroke-dasharray", path_length + " " + path_length)
              .attr("stroke-dashoffset", path_length)
              .transition()
              .duration(350)
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
              .attr("cx", function(d) { return xScale(set_time(new Date(d[0]))); }) //(new Date(d[0]))
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
        });        
        
    }
    render() {
        // return <svg></svg>
        return <svg ref={node => this.node = node}></svg>
    }
}
 
export default function CityGraph(food_code) {

    return (
        <div>
            <a href="#" id="sapporo">札幌</a>
            <a href="#" id="sendai">仙台</a>
            <a href="#" id="tokyo">東京</a>
            <a href="#" id="yokohama">横浜</a>
            <a href="#" id="kanazawa">金沢</a>
            <a href="#" id="nagoya">名古屋</a>
            <a href="#" id="kyoto">京都</a>
            <a href="#" id="osaka">大阪</a>
            <a href="#" id="kobe">神戸</a>
            <a href="#" id="hiroshima">広島</a>
            <a href="#" id="takamatsu">高松</a>
            <a href="#" id="kitakyusyu">北九州</a>
            <a href="#" id="fukuoka">福岡</a>
            <a href="#" id="okinawa">沖縄</a>
            <a href="#" id="allon">全表示</a>
            <a href="#" id="alloff">全消去</a>

            <City id="chart" food_code={food_code.food_code}></City>
        </div>
    )
}