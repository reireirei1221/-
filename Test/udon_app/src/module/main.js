import * as React from 'react';
import {useState} from 'react';
import * as d3 from "d3"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import BasicGrid from './BasicGrid'; 
import DropdownSelect from './DropdownSelect';

import "../css/index.css";

const colorList_A = {
    "main1":"#546A7B",
    "main2":"#FDFDFF",
    "sub1":"#393D3F",
    "sub2":"#C6C5B9",
    "sub3":"#62929E"
}

var foodList = []
var codeList = []

function ReptileListItems(foodList) {
  console.log(foodList)
  return (foodList.foodList.foodList).map((food) => <li>{food}</li>);
  // return "s"
}

export default function Tmp(){

const [inputText, setInputText] = useState("");

  function UpdatefoodList(LabelAndIndex) {
    console.log(LabelAndIndex);
    const text = LabelAndIndex[0];
    const foodCode = LabelAndIndex[1];
    const index = LabelAndIndex[2];  
    setInputText(Math.random())
    if (index === 0) {
      foodList = [];
      codeList = [];
    }
    foodList.push(text);
    codeList.push(String(foodCode));
    console.log("foodList", foodList)
    console.log("foodList[1]", codeList)
  }

  d3.select("#graph").remove();
  const [button_flag, SetFoodRegion] = useState("f");
  if (document.getElementById("chart")) { document.getElementById("chart").remove();};
  
  if (button_flag === "r") {
  return (
    <div>
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static"style={{ color: "#ffffff", backgroundColor: colorList_A["main1"]}}>
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
                Udon
            </Typography>
                    <div style={{marginLeft:"auto"}}>
                    <Stack spacing={2} direction="row" className="buttongraphcss">
                        <Button id="buttonheader" variant="contained" onClick={() => SetFoodRegion("f")} style={{color:"#ffffff", backgroundColor:colorList_A["sub3"], width:100, height:30, margin:10, fontSize:10}}>食材間比較</Button>
                        <Button id="buttonheader" variant="contained" onClick={() => SetFoodRegion("r")} style={{color:"#ffffff", backgroundColor:colorList_A["sub3"], width:100, height:30, margin:10, fontSize:10}}>地域間比較</Button>
                    </Stack>
                   </div>
          </Toolbar>
        </AppBar>
      </Box>
      </div>
      <div className="dropdownselect">
         <div style={{paddingLeft:200, paddingRight:200, paddingTop:10, paddingBottom:20, marginBottom:20 , textAlign:"left",   position:"relative"}}>
           <p className="string1">食材選択</p>
           <DropdownSelect UpdatefoodList={e => UpdatefoodList(e)}/>
         </div>
       </div>
      <BasicGrid flag={button_flag} food_code={codeList[0]}/>
    </div>
  ) } else {
    return (
        <div>
        <div>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static"style={{ color: "#ffffff", backgroundColor: colorList_A["main1"]}}>
              <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                </IconButton>
                <Typography variant="h6" color="inherit" component="div">
                    Udon
                </Typography>
                    <div style={{marginLeft:"auto"}}>
                        <Stack spacing={2} direction="row" className="buttongraphcss">
                            <Button id="buttonheader" variant="contained" onClick={() => SetFoodRegion("f")} style={{color:"#ffffff", backgroundColor:colorList_A["sub3"], width:100, height:30, margin:10, fontSize:10}}>食材間比較</Button>
                            <Button id="buttonheader" variant="contained" onClick={() => SetFoodRegion("r")} style={{color:"#ffffff", backgroundColor:colorList_A["sub3"], width:100, height:30, margin:10, fontSize:10}}>地域間比較</Button>
                        </Stack>
                    </div>
              </Toolbar>
            </AppBar>
          </Box>
          </div>
          <BasicGrid flag={button_flag} food_code={codeList[0]}/>
        </div>
      )
  }
}

