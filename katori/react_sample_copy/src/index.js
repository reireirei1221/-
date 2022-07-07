import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./css/index.css"

// 作成したグラフをインポート
import ButtonGraph from "./module/ButtonGraph";
import Header from "./module/Header";
import DropdownSelect from "./module/DropdownSelect";

var foodList = []
var codeList = []

function App() {
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
    // console.log(codeList)
    // console.log(foodList);
    // console.log(codeList);
  }

  return (
    <div className="App">
      <Header/>
      <div className="dropdownselect">
        <div style={{paddingLeft:200, paddingRight:200, paddingTop:10, paddingBottom:20, marginBottom:20 , textAlign:"left",   position:"relative"}}>
          <p className="string1">食材選択</p>
          <DropdownSelect UpdatefoodList={e => UpdatefoodList(e)}/>
        </div>
      </div>
      <ButtonGraph foodList={foodList} food_code={codeList[0]}/>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
