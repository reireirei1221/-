import * as React from 'react';
import {useState} from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import BasicGrid from './BasicGrid';

function ReptileListItems(foodList) {
  console.log(foodList)
  return (foodList.foodList.foodList).map((food) => <li>{food}</li>);
  // return "s"
}

export default function ButtonGraph(foodList, food_code) {
  // console.log("food_code, buttongraphs", foodList. )
  // const food_code = ""
  // console.log("food_list", foodList.food_code)
  const [button_flag, SetFoodRegion] = useState("f");
  if (document.getElementById("chart")) { document.getElementById("chart").remove();};
  return (
    <div>
      <div style={{backgroundColor:"#efefef", marginLeft:250, width:300, height:120, borderRadius:10, float:"left"}}>
          <div style={{paddingLeft:30, paddingRight:30, paddingTop:30, paddingBottom:30}}>
            <div>
              <Stack spacing={2} direction="row" className="buttongraphcss">
                <Button variant="contained" onClick={() => SetFoodRegion("f")} style={{color:"#ffffff", backgroundColor:"#000080", width:120, height:60}}>食材間比較</Button>
                <Button variant="contained" onClick={() => SetFoodRegion("r")} style={{color:"#ffffff", backgroundColor:"#000080", width:120, height:60}}>地域間比較</Button>
              </Stack>
            </div>
          </div>
        </div>
      <div style={{backgroundColor:"#efefef", marginRight:100, width:600, height:120, borderRadius:10, float:"right"}}>
          <div style={{paddingLeft:30, paddingRight:30,paddingBottom:50}}>
            <p id="selectedFood" className="string2" style={{textAlign:"left", verticalAlign:"top"}}>選択された食材</p><ReptileListItems foodList={foodList}/>
          </div> 
      </div>
      <BasicGrid flag={button_flag} food_code={foodList.food_code}/>
    </div>
  )
}

