import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css"

// 作成したグラフをインポート
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
