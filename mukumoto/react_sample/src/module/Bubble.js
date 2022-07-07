import React, { Component } from 'react';
import * as d3 from 'd3';
// import layout from "https://cdn.skypack.dev/d3@3";
// import * as d3 from "d3.min.js";

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
    var width = 800,
    height = 500,
    padding = 1.5, // separation between same-color circles
    clusterPadding = 6, // separation between different-color circles
    maxRadius = 12;
    
    var n = 76, // total number of circles
        m = 10; // number of distinct clusters
    
    var color = d3.scaleOrdinal(d3.schemeCategory10)
        .domain(d3.range(m));
    
    // The largest node for each cluster.
    var clusters = new Array(m);
    
    var price_list = [];
    var flag = [];
    
    d3.csv("nov_total5.csv").then(function(data){
      
      data.forEach(function(d){
          price_list.push({cluster: 0, radius: d["価格"]/1.0, name: d["品目名"], length: d["文字数"]});
      });
    
      for (var i = 0; i < n; i++) {
        flag.push(false);
      }
    
      // console.log(price_list)
      main_task(-1);
    
    });
    
    
    function main_task(color_flag) {
    
      var index = 0;
    
      var nodes = d3.range(n).map(function() {
    
        var i = index % 5;
        if (color_flag == -1) {
          var r = 1 / (price_list[index].radius * price_list[index].radius) * 20;
        }
        else if (color_flag == i) {
          var r = 1 / (price_list[index].radius * price_list[index].radius) * 40;
        }
        else {
          var r = 0;
        }
      
        //    r = 1 / price_list[index].radius * 20
          var n = price_list[index].name
            const l = price_list[index].length
            const d = {cluster: i, radius: r, name: n, length: l};
        index += 1;
        if (!clusters[i] || (r > clusters[i].radius)) clusters[i] = d;
            return d;
          
        });
    
      console.log(nodes);
    
    // var force = d3.layout.force()
    var force = d3.forceSimulation()
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width/2, height/2));
    
    var svg = d3.select(node).append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("id", "map");
    
    var circle = svg.selectAll("circle")
        .data(nodes)
          .enter().append("circle")
          .attr("class", "node_group")
        .attr("r", function(d) { return d.radius; })
        .style("fill", function(d) { return color(d.cluster); })
        .call(force.drag)
          .on("click", clicked);

        //   force
        //   .nodes(circle)
          // .size([width, height])
          // .gravity(.02)
          // .charge(0)
        //   .on("tick", tick)
          // .start();
    
    svg.selectAll("circle")  
        .filter(function(v, i) {
            if (flag[v.index]) {
                      return true;
            }
              })
        .attr("opacity", 0.3)
    
    // var flag = false;
     
    function clicked(event, d) {
        flag[d] = !flag[d]; 
        d3.selectAll("circle")
              .filter(function(v, i) {
            if (flag[v.index]) {
                      return true;
            }
              })
          .attr("opacity", 0.3)
        
        
        d3.selectAll("circle")
              .filter(function(v, i) {
            if (!flag[v.index]) {
                      return true;
            }
              })
          .attr("opacity", 1)
    }
    
    svg.selectAll(".node_group") 
        .append("circle")
        .attr("stroke", "black")
    
    
    var text = svg.selectAll("text")
          .data(nodes)
          .enter().append("text")
        .attr("stroke", "none") 
        .attr("fill", "white")
          .attr("font-size", function(d) { return d.radius/3; })
        .attr("font-weight", "bolder")
        .text(function(d){ return d.name;});
        
    
    function tick(e) {
      circle
        .each(cluster(30 * e.alpha * e.alpha))
        .each(collide(.5))
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
      text
          .attr("x", function(d) { return d.x - d.radius*d.length/6; })
        .attr("y", function(d) { return d.y + d.radius/8; })
    }
    
    // Move d to be adjacent to the cluster node.
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
    
    // Resolves collisions between d and all other circles.
    function collide(alpha) {
      var quadtree = d3.quadtree(nodes);
      return function(d) {
        var r = d.radius + maxRadius + Math.max(padding, clusterPadding),
            nx1 = d.x - r,
            nx2 = d.x + r,
            ny1 = d.y - r,
            ny2 = d.y + r;
        quadtree.visit(function(quad, x1, y1, x2, y2) {
          if (quad.point && (quad.point !== d)) {
            var x = d.x - quad.point.x,
                y = d.y - quad.point.y,
                l = Math.sqrt(x * x + y * y),
                r = d.radius + quad.point.radius + (d.cluster === quad.point.cluster ? padding : clusterPadding);
            if (l < r) {
              l = (l - r) / l * alpha;
              d.x -= x *= l;
              d.y -= y *= l;
              quad.point.x += x;
              quad.point.y += y;
            }
          }
          return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        });
      };
    }
      document.getElementById("blue").onclick = function(){
        d3.select("#map").remove();
        main_task(0);
      }
    
      document.getElementById("green").onclick = function(){
        d3.select("#map").remove();
        main_task(2);
      }
    
      document.getElementById("orange").onclick = function(){
        d3.select("#map").remove();
        main_task(1);
      }
    
      document.getElementById("red").onclick = function(){
        d3.select("#map").remove();
        main_task(3);
      }
    
      document.getElementById("purple").onclick = function(){
        d3.select("#map").remove();
        main_task(4);
      }
    
      document.getElementById("all").onclick = function(){
        d3.select("#map").remove();
        main_task(-1);
      }
    
    }
    }
    render() {
        return <svg ref={node => this.node = node}></svg>
    }
}
 
export default function BubbleGraph(food_code) {
    return (
        <div>
            <Bubble/>
        </div>
    )
}