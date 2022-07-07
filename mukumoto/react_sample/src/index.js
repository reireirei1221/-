import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./css/index.css"

// 作成したグラフをインポート
import ButtonGraph from "./module/ButtonGraph";
import Header from "./module/Header";
import DropdownSelect from "./module/DropdownSelect";
import BubbleGraph from "./module/BubbleChart";
import Main from "./module/main";

function App() {
  return (
    <div className="App">
      <Main/>
    </div>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
