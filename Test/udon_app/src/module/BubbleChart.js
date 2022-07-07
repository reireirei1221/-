import React, { Component } from 'react';
import * as d3 from 'd3';
import "../css/bubble.css"


class Bubble extends Component {
    constructor(props){
      super(props)
      this.createBubble = this.createBubble.bind(this)
    }
  
    componentDidMount() {
      this.createBubble()
    }
    componentDidUpdate() {
      this.createBubble()
    }
  
    createBubble() {
      const node = this.node;

      // 折れ線グラフの変数定義
    var food_code_list = []; //最後に実装
    var colors = {"aqua":false, "navy":false, "fuchsia":false, "green":false, "maroon":false, "purple":false, "red":false, "teal":false, "olive":false, "silver":false}; //10個
    var code_length;
    var display_flags = {}; //最後に実装(バブルチャートでも使用)
    var queue = {}; //10個まで, 品物コード:[色, 追加順番(0~9)] //0が最初に死ぬ
    var dataset = {};
    var dataset2 = {}; //一番古い値を基準にしたパーセント表示
    var width = 600; // グラフの幅
    var height = 550; // グラフの高さ
    var height_recipe = 200;
    var svg_legend;
    var width_legend = 500;
    var height_legend = 50;
    var heightGraph = height - height_recipe - height_legend + 20;
    // var height_recipe = 200;
    var margin = { "top": 30, "bottom": 60, "right": 40, "left": 60 };
    var xScale, yScale;
    var start_day, end_day;
    var changed; //グラフ描画モーションを行うグラフを制御(品目コード)
    var svg = d3.select(node).attr("width", width*2+200).attr("height", height+200); //折れ線グラフ用
    var tooltip;

    var n = 82, // total number of circles
        m = 10; // number of distinct clusters
    
    var color = d3.scaleOrdinal(d3.schemeCategory10);
    var clusters = new Array(m);
    var price_list = [];
    var price_list2 = [];
    var flag = [];
    var recipe_dataset = {}
    var i;
    var n;


    // 凡例の変数定義
    
    var vice_queue = {} //追加順番:[品物コード, 色]
    var circle_pos = [];
    for (var i = 0; i < 2; i++) {
      for (var j = 0; j < 5; j++) {
        circle_pos.push([Math.floor((2*i+1)*height_legend/4), Math.floor((5*j+1)*width_legend/25), 5*i+j]);
      }
    }
    var text_pos = [];
    for (var i = 0; i < 2; i++) {
      for (var j = 0; j < 5; j++) {
        text_pos.push([Math.floor((2*i+1)*height_legend/4)+5, Math.floor((5*j+1)*width_legend/25) + 10, 5*i+j]);
      }
    }
    var food_code_dic = {}; //品目コード:品目名
    //console.log(circle_pos);

  //折れ線グラフ描画用データセット読み込み
  d3.csv("nov_total4.csv").then(function(data){
    var products_list = [];
    data.forEach(function(d){
      if(products_list.indexOf(d["品目コード"]) == -1) {
        products_list.push(d["品目コード"]);
        dataset[d["品目コード"]] = [];
        dataset[d["品目コード"]].push([d['年']+'-'+d['月']+'-'+d["日"],d["価格"]/1]);
        food_code_dic[String(d["品目コード"])] = d["品目名"];
      }
      else {
        dataset[d["品目コード"]].push([d['年']+'-'+d['月']+'-'+d["日"],d["価格"]/1]);
      }
    });
    food_code_list = Object.keys(dataset);
    code_length = food_code_list.length;
    for (var i = 0; i < food_code_list.length; i++) {
      display_flags[food_code_list[i]] = false;
    }
    //console.log(food_code_dic);
    make_dataset2();
  
  //バブルチャートデータセット読み込み
  d3.csv("nov_total5.csv").then(function(data){
    data.forEach(function(d){
	    price_list.push({cluster: 0, radius: d["価格"]/1.0, name: d["品目名"], code: d["品目コード"], length: d["文字数"], class: d["種類"]});
      price_list2.push([d["品目コード"]])
    });
    for (var i = 0; i < n; i++) {
      flag.push(false);
    }
    d3.csv("recipe.csv").then(function(data){
      data.forEach(function(d){
        recipe_dataset[d['value']] = []
        recipe_dataset[d['value']].push({recipe1: d['レシピ名1'], recipe1_URL: d['レシピURL1'], recipe2: d['レシピ名2'], recipe2_URL: d['レシピURL2'], recipe3: d['レシピ名3'], recipe3_URL: d['レシピURL3'], recipe4: d['レシピ名4'], recipe4_URL: d['レシピURL4'], recipe5: d['レシピ名5'], recipe5_URL: d['レシピURL5']})
      })
      // console.log(recipe_dataset);
    })
    main_task(-1);
    });
    // show_graph_all(); //初めは東京のみ表示
  });

  //折れ線グラフ描画用
  function make_dataset2() {
    for (var i = 0; i < code_length; i++) {
      var food_code = food_code_list[i];
      if (typeof dataset[food_code] == "undefined") continue;
      var selected_dataset = dataset[food_code];
      var start_value;
      var flag = true;
      for (var j = 0; j < selected_dataset.length; j++) {
        if (flag) {
          start_value = selected_dataset[j][1];
          if (start_value == 0) continue;
          dataset2[food_code] = [];
          dataset2[food_code].push([selected_dataset[j][0], 100]);
          flag = false;
        }
        else {
          dataset2[food_code].push([selected_dataset[j][0], Math.floor(100 * selected_dataset[j][1] / start_value)]);
        }
      }
    }
  }

  //折れ線グラフ用
  function make_svg() {
    svg = d3.select(node).append("svg")
      .attr("width", width)
      .attr("height", 30+heightGraph)
      .attr("x", width)
      .attr("y", height_legend + height_recipe-20)
      .attr("id", "chart");
    tooltip = d3.select(node).append("div")
      .attr("class", "tooltip");
  }

  //折れ線グラフ用
  function change_flags(selected_button) {
    var onoff = 0;
    if (selected_button == "alloff") {
      changed = "nothing"; //追加
      for (var i = 0; i < code_length; i++) {
        display_flags[food_code_list[i]] = false;
      }
      onoff = 1;
    }
    else if (display_flags[selected_button] == true) {
      changed = "nothing"; //追加
      display_flags[selected_button] = false;
      onoff = 3;
    }
    else {
      changed = selected_button; //追加
      display_flags[selected_button] = true;
      onoff = 2;
    }
    adjust_flags(selected_button, onoff);
    update_vice_queue();
    //console.log(vice_queue);
  }

  function adjust_flags(selected_button, onoff) {
    if (onoff == 1) {
      queue = {}; //空にする
      for (var key in colors) {
        colors[key] = false;
      }
    }
    else {
      var count = 0
      for (var i = 0; i < code_length; i++) {
        if (display_flags[food_code_list[i]] == true) count++;
      }
      if (onoff == 2) {
        if (count > 10) {
          for (key in queue) {
            if (queue[key][1] == 9) {
              var elm = queue[key][0]; //色
              display_flags[key] = false;
              colors[elm] = false;
              delete queue[key];
            }
          }
        }
        for (key in queue) {
          queue[key][1]++;
        }
        for (key in colors) {
          if (colors[key] == false) {
            queue[selected_button] = [key,0];
            colors[key] = true;
            break;
          }
        }
      }
      else if (onoff == 3) {
        var elm = queue[selected_button][0]; //色
        var num = queue[selected_button][1]; //追加順番
        colors[elm] = false;
        for (key in queue) {
          if (queue[key][1] > num) queue[key][1]--;
        }
        delete queue[selected_button];
      }
    }
  }

  function update_vice_queue() {
    vice_queue = {};
    var keys = Object.keys(queue);
    //console.log(keys);
    for (var i = 0; i < keys.length; i++) {
      //console.log(key[i]);
      vice_queue[queue[keys[i]][1]] = [keys[i], queue[keys[i]][0]];
    }
    for (var i = 0; i < 10; i++) {
      //console.log(vice_queue[i]);
      if (typeof vice_queue[i] == "undefined") {
        //console.log(i);
        vice_queue[i] = ["none", "#e9ecef"];
      }
    }
  }
  
  //折れ線グラフ用
  function set_scale() {
    //開始・終了日付を見つける(より開始は古い日付にする)
    start_day = new Date('2025-12-31');
    end_day = new Date('2000-01-01');
    var all_false = true;
    for (var i = 0; i < code_length; i++) {
      var food_code = food_code_list[i];
      if (typeof dataset2[food_code] == "undefined") continue;
      var selected_dataset = dataset2[food_code];
      if (display_flags[food_code]) {
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
    var offset = 10;
    for (var i = 0; i < code_length; i++) {
      var food_code = food_code_list[i];
      if (typeof dataset2[food_code] == "undefined") continue;
      var selected_dataset = dataset2[food_code];
      if (display_flags[food_code]) {
        for (var j = 0; j < selected_dataset.length; j++) {
          min_cost = Math.min(min_cost, selected_dataset[j][1]);
          max_cost = Math.max(max_cost, selected_dataset[j][1]);
        }
      }
    }
    yScale = d3.scaleLinear()
      .domain([Math.max(min_cost-offset, 0), max_cost+offset])
      .range([heightGraph - margin.bottom, margin.top]);
  }

  //折れ線グラフ用
  function set_time(date) {
    return date.setHours(date.getHours() - 9);
  }

  //折れ線グラフ用
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


  //折れ線グラフ用
  function show_axis() {
    var axis_x = d3.axisBottom(xScale)
      .tickValues(make_ticks(start_day, end_day))
      //.ticks(d3.timeDay.every(tick_distance(start_day,end_day))) //日本時間とグリニッジ時間を合わせる //d3.utcDay //自動的に目盛り数が8くらいになるように飛ばす間隔を調整
      .tickFormat(d3.timeFormat("%m/%d/%a"))
      .tickSize(-heightGraph + margin.bottom + margin.top);
    var axis_y = d3.axisLeft(yScale)
      .ticks(20)
      .tickSize(-width + margin.left + margin.right);
    svg.append("g")
      .attr("class", "x_axis")
      .attr("transform", "translate(" + 0 + "," + (heightGraph - margin.bottom) + ")")
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
      .attr("x", -(heightGraph - margin.top - margin.bottom) / 2 - margin.top)
      .attr("y", -35)
      .attr("transform", "rotate(-90)")
      .attr("font-weight", "bold")
      .attr("font-size", "10pt")
      .text("価格比 [%]");
  }

  //折れ線グラフ用
  function line_plot() {
    for (var i = 0; i < code_length; i++) {
      var food_code = food_code_list[i];
      if (typeof dataset2[food_code] == "undefined") continue;
      var selected_dataset = dataset2[food_code];
      if (display_flags[food_code] == false) continue;
      var path = svg.append("path")
        .datum(selected_dataset)
        .attr("fill", "none")
        .attr("stroke", queue[food_code][0])
        .attr("stroke-width", 1.0)
        .attr("d", d3.line()
            .x(function(d) { return xScale(set_time(new Date(d[0]))); })
            .y(function(d) { return yScale(d[1]); }));
      /* 追加 */
      if (changed == "nothing") continue;
        else if (changed != "allon") {
          if (changed != food_code) continue;
      }
      /* 追加終わり */
      var path_length = path.node().getTotalLength(); //パスの長さ //以下でモーションをつける
      path.attr("stroke-dasharray", path_length + " " + path_length)
        .attr("stroke-dashoffset", path_length)
        .transition()
        .duration(350)
        .attr("ease", "linear")
        .attr("stroke-dashoffset", 0);
    }
  }

  //折れ線グラフ用
  function scatter_plot() {
    for (var i = 0; i < code_length; i++) {
      var food_code = food_code_list[i];
      if (typeof dataset2[food_code] == "undefined") continue;
      var selected_dataset = dataset2[food_code];
      if (display_flags[food_code] == false) continue;
      svg.append("g")
        .selectAll("circle")
        .data(selected_dataset)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return xScale(set_time(new Date(d[0]))); })
        .attr("cy", function(d) { return yScale(d[1]); })
        .attr("fill", queue[food_code][0])
        .attr("r", 3)
        //データ点に対してマウスホバーした時の挙動
        .on("mouseover", function(d, i) {
          tooltip
            .style("visibility", "visible")
            .html(i[0] + "<br>" + i[1] + "%");
        })
        .on("mousemove", function(d) {
          tooltip
            .style("top", (d.clientY - 20) + "px")
            .style("left", (d.clientX + 10) + "px");
        })
        .on("mouseout", function(d) {
          tooltip.style("visibility", "hidden");
        });
    }
  }

  //折れ線グラフ用
  function show_graph_all() {
    make_svg();
    make_svg_legend();
    set_scale();
    show_axis();
    line_plot();
    scatter_plot();
    write_legend();
  }


  //凡例 svg定義
  function make_svg_legend() {
    svg_legend = d3.select(node).append("svg")
      .attr("x", width*1.1)
      .attr("y", height_recipe-2)
      .attr("width", width_legend+40)
      .attr("height", height_legend+10)
      .attr("id", "legend");
  }

  //凡例 
  function determine_color(str) {
    if (str=="none") return "white";
    else return str;
  }
  function determine_text(str) {
    if (str=="none") return "";
    else return food_code_dic[str];
  }

  //凡例
  function write_legend() {
    svg_legend
    .append("rect")
    .attr("x", 5)
    .attr("y", 1)
    .attr("height", height_legend)
    .attr("width", width_legend-10)
    // .attr("x", 40)
    .style("fill", "#e9ecef") //yellow
    // .style("fill", "white")
    .attr("stroke", "black")
    .attr("rx", 10)
    .attr("ry", 10);

    svg_legend.append("g")
      .selectAll("circle")
      .data(circle_pos)
      .enter()
      .append("circle")
      .attr("cx", function(d) { return d[1]})
      .attr("cy", function(d) { return d[0]})
      .attr("fill", function(d) { return determine_color(vice_queue[d[2]][1])})
      .attr("r", 6);

    svg_legend.append("g")
      .selectAll("text")
      .data(text_pos)
      .enter()
      .append("text")
      .attr("x", function(d) { return d[1]})
      .attr("y", function(d) { return d[0]})
      .text(function(d) {return determine_text(vice_queue[d[2]][0])});
  }


function main_task(color_flag) {
  console.log("main_task", color_flag)
  show_recipe(-1);

  var index = 0;

  var nodes = d3.range(n).map(function() {
    //    r = 1 / price_list[index].radius * 20 
    // console.log("index", index)
    // console.log("price_list", price_list[index])
    var i = price_list[index].class
    var n = price_list[index].name
    var l = price_list[index].length
    var c = price_list[index].code
    // console.log("i, n, l, c", i, n, l, c)
    // var i = index % 5;
    console.log("color_flag", color_flag, "i", i)
    if (color_flag === -1) {
        var r = 1 / Math.pow(price_list[index].radius, 1.6) * 20;
    }
    else if (color_flag == i) {
        console.log(n)
        var r = 1 / Math.pow(price_list[index].radius, 1.6) * 40;
    }
    else {
        var r = 0;
    }

    var d = {cluster: i, radius: r, name: n, length: l, code: c, radius_: price_list[index].radius};
    index += 1;
    if (!clusters[i] || (r > clusters[i].radius)) clusters[i] = d;
        return d;
  });

  var force = d3.forceSimulation()
    .force("charge", d3.forceManyBody().strength(0))
    .force("collide", d3.forceCollide().radius(function(d) { return d.radius * 1.1; }))
    .force("center", d3.forceCenter(width / 2, height * 4/7))
    .force("x", d3.forceX().strength(.01))
    .force("y", d3.forceY().strength(.01))
    .nodes(nodes)
    .on("tick", tick)
    
  var svg2 = d3.select(node).append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "graph");

  var tooltip2 = d3.select(node).append("div").attr("class", "tooltip2");

  var circle = svg2
    .selectAll("circle")
    .data(nodes).enter().append("circle")
	  .attr("class", "node_group")
    .on("click", clicked)
    .call(d3.drag()
      .on("start", dragstarted) 
      .on("drag", dragged) 
      .on("end", dragended))
    .on("mouseover", function(event,d) {
              tooltip2
              .style("visibility", "visible")
              .html("名前 : " + d.name + "<br>倍率 : " + d.radius_.toFixed(3));
        })
        .on("mouseout", function(event,d) {
              tooltip2.style("visibility", "hidden");
        })
    .on("mousemove", function(event,d) {
              tooltip2
              .style("top", (event.pageY - 30) + "px")
              .style("left", (event.pageX + 20) + "px");
        });

  d3.selectAll("circle")
		  .filter(function(v, i) {
        if (!display_flags[v.code]) {
			      return true;
        }
		  })
      .attr("opacity", 1)

  d3.selectAll("circle")
		  .filter(function(v, i) {
        if (display_flags[v.code]) {
			      return true;
        }
		  })
      .attr("opacity", 0.3)

  var text = svg2
    .selectAll("text")
	  .data(nodes).enter().append("text")
    .attr("class", "node_group")
    .text(function(d){ return d.name;})

  

  function show_recipe(d) {
  

    var svg_recipe = d3.select(node).append("svg")
      .attr("x", width*1.1)
      .attr("width", width_legend+10)
      .attr("height", height_recipe)
      .attr("id", "recipe");

  svg_recipe
    .append("rect")
    .attr("x", 5)
    .attr("y", 20)
    .attr("height", height_recipe-30)
    .attr("width", width_legend-10)
    .style("fill", "#e9ecef") //yellow
    .attr("stroke", "black")
    .attr("rx", 10)
    .attr("ry", 10);


  var explain_text = "「　　　  　　　　　」を使ったおすすめレシピ♪";
  var explain_text_length = explain_text.length

  svg_recipe
    .append("text")
    .attr("x", 6 + 6*explain_text_length)
    .attr("y", 40)
    .style("fill", "black")
    .style("font-size", "12px")
    .attr("dy", ".30em")
    .attr("text-anchor", "middle")
    .style("pointer-events", "none")
    .text(explain_text);

    if (d != -1) {
    var food_name = d.name;

  var food_name_text = svg_recipe
    .append("text")
    .attr("x", 53 + 6*food_name.length)
    .attr("y", 40)
    .style("fill", "red")
    .style("font-size", "12px")
    .attr("dy", ".30em")
    .attr("text-anchor", "middle")
    .style("pointer-events", "none")
    .text(food_name)
    .attr("font-weight", "bolder");
  
  for (var i = 1; i < 6; i++) {
    console.log(recipe_dataset[d.code][0])
    var recipe_name = recipe_dataset[d.code][0]['recipe' + String(i)];

    var length = recipe_name.length; 
    svg_recipe.append("a")
      .attr("href", recipe_dataset[d.code][0]['recipe' + String(i) + '_URL']) //href
      .append("rect")
      .attr("x", 20) //10
      .attr("x", 20)
      .attr("y", 30 + 24*i)
      .attr("height", 20)
      .attr("width", 15*length + 20)
      .style("fill", "rgba(255,255,255,0)") //lightgreen
      .attr("rx", 10)
      .attr("ry", 10);

    svg_recipe.append("text")
      .attr("x", 30 + 6*length) //20
      .attr("x", 30 + 6*length)
      .attr("y", 40 + 24*i)
      .style("fill", "blue") //black
      .style("font-size", "12px")
      .attr("dy", ".30em")
      .attr("text-anchor", "middle")
      .style("pointer-events", "none")
      .attr("text-decoration", "underline")
      .text(recipe_name);
    }
  }
  }
  
  function clicked(event, d) {

    change_flags(price_list2[d.index][0]);
    d3.select("#chart").remove();
    d3.select("#legend").remove();
    show_graph_all();

      d3.select("#recipe").remove();
      show_recipe(d);

	  flag[d.index] = !flag[d.index];

    d3.selectAll("circle")
		  .filter(function(v, i) {
        if (!display_flags[v.code]) {
			      return true;
        }
		  })
      .attr("opacity", 1)

    d3.selectAll("circle")
		  .filter(function(v, i) {
        if (display_flags[v.code]) {
			      return true;
        }
		  })
      .attr("opacity", 0.3)
  } 


  function tick() {

    circle
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", function(d) { return d.radius; })
      .each(cluster(30 * this.alpha() * 0.1 * this.alpha() * 0.5))
      .style("fill", function(d) { return color(d.cluster); })
    text
	    .attr("x", function(d) { return d.x - d.radius*d.length/6; })
      .attr("y", function(d) { return d.y + d.radius/8; })
      .attr("stroke", "none") 
      .attr("fill", "white")
	    .attr("font-size", function(d) { return d.radius/3; })
      .attr("font-weight", "bolder")
  }

  function dragstarted(event, d) {

    if (!event.active) force.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event, d) {
    if (!event.active) force.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  document.getElementById("blue").onclick = function(){
    d3.select("#graph").remove();
    main_task(0);
    console.log("blue", document.getElementById("blue"))
  }

  document.getElementById("green").onclick = function(){
    d3.select("#graph").remove();
    main_task(1);
  }

  document.getElementById("orange").onclick = function(){
    d3.select("#graph").remove();
    main_task(6);
  }

  document.getElementById("red").onclick = function(){
    d3.select("#graph").remove();
    main_task(2);
  }

  document.getElementById("purple").onclick = function(){
    d3.select("#graph").remove();
    main_task(4);
  }

  document.getElementById("pink").onclick = function(){
    d3.select("#graph").remove();
    main_task(5);
  }

  document.getElementById("brown").onclick = function(){
    d3.select("#graph").remove();
    main_task(3);
  }

  document.getElementById("all").onclick = function(){
    d3.select("#graph").remove();
    main_task(-1);
  }

  function cluster(alpha) {
    return function(d) {
      var cluster = clusters[d.cluster];
      if (cluster === d) return;
      var x = d.x - cluster.x,
        y = d.y - cluster.y,
        l = Math.sqrt(x * x + y * y),
        r = d.radius + cluster.radius;
      if (l != r) {
        l = (l - r) / l * alpha;
        d.x -= x *= l;
        d.y -= y *= l;
        cluster.x += x;
        cluster.y += y;
      }
    };
  }
  }
}
    
    render() {
      return <svg ref={node => this.node = node}> 
      </svg>
    }
}

      
export default function BubbleGraph() {
  return (
    <div>
    <select >
      <option id="choose">--食材の種類を選択してください--</option>
      <option id="blue">野菜(根菜類)</option>
      <option id="green">野菜(葉茎菜類)</option>
      <option id="brown">野菜(きのこ類)</option>
      <option id="red">野菜(果菜類)</option>
      <option id="orange">果物(みかん科)</option>
      <option id="pink">果物(バラ科)</option>
      <option id="purple">その他</option>
      <option id="all">All</option>
    </select>
    <Bubble/>
    </div>
  )
}