import React from 'react'
import Select from 'react-select'
import * as d3 from "d3"

function ReadLabels(){
    var options;
    d3.csv("nov_total6.csv").then(function (data) {
        options = data;
    });
    return options;
}

export default ReadLabels;