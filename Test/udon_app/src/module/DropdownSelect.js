import { MenuItem } from '@mui/material'
import React from 'react'
import Select from 'react-select'
import * as d3 from "d3"


const options = [
  {value: "30100", label: "だいこん"},
  {value: "30200", label: "かぶ"},
  {value: "30300", label: "にんじん" },
  {value: "30400", label: "ごぼう" },
  {value: "30500", label: "たけのこ" },
  {value: "30600", label: "れんこん" },
  {value: "31100", label: "はくさい" },
  {value: "31300", label: "みずな" },
  {value: "31500", label: "こまつな" },
  {value: "31560", label: "ちんげんさい" },
  {value: "31700", label: "キャベツ" },
  {value: "31800", label: "ほうれんそう" },
  {value: "31900", label: "ねぎ" },
  {value: "32300", label: "ふき" },
  {value: "32400", label: "うど" },
  {value: "32500", label: "みつば" },
  {value: "32600", label: "しゅんぎく" },
  {value: "32800", label: "にら" },
  {value: "32900", label: "セルリー" },
  {value: "33100", label: "アスパラガス" },
  {value: "33200", label: "カリフラワー" },
  {value: "33300", label: "ブロッコリー" },
  {value: "33400", label: "レタス" },
  {value: "33600", label: "パセリ" },
  {value: "34100", label: "きゅうり" },
  {value: "34200", label: "かぼちゃ" },
  {value: "34300", label: "なす" },
  {value: "34400", label: "トマト" },
  {value: "34450", label: "ミニトマト" },
  {value: "34500", label: "ピーマン" },
  {value: "34600", label: "ししとう" },
  {value: "34700", label: "スイトコーン" },
  {value: "35100", label: "さやいんげん" },
  {value: "35200", label: "さやえんどう" },
  {value: "35300", label: "実えんどう" },
  {value: "35400", label: "そらまめ" },
  {value: "35500", label: "えだまめ" },
  {value: "36100", label: "かんしょ" },
  {value: "36200", label: "ばれいしょ" },
  {value: "36300", label: "さといも" },
  {value: "36500", label: "やまのいも" },
  {value: "36610", label: "たまねぎ" },
  {value: "36700", label: "にんにく" },
  {value: "37200", label: "しょうが" },
  {value: "38100", label: "生しいたけ" },
  {value: "38300", label: "なめこ" },
  {value: "38400", label: "えのきだけ" },
  {value: "38500", label: "しめじ" },
  {value: "40100", label: "みかん" },
  {value: "41201", label: "ネーブル" },
  {value: "41253", label: "甘なつみかん" },
  {value: "41301", label: "いよかん" },
  {value: "41321", label: "はっさく" },
  {value: "42204", label: "つがる" },
  {value: "42505", label: "ジョナゴルド" },
  {value: "42515", label: "王林" },
  {value: "42804", label: "ふじ" },
  {value: "43203", label: "幸水" },
  {value: "43205", label: "豊水" },
  {value: "43302", label: "二十世紀" },
  {value: "43310", label: "新高" },
  {value: "43499", label: "西洋なし" },
  {value: "43700", label: "甘がき" },
  {value: "43751", label: "渋がき" },
  {value: "44100", label: "もも" },
  {value: "44700", label: "すもも" },
  {value: "45202", label: "デラウェア" },
  {value: "45206", label: "巨峰" },
  {value: "45700", label: "くり" },
  {value: "46100", label: "いちご" },
  {value: "47200", label: "温室メロン" },
  {value: "47213", label: "アンデス" },
  {value: "48100", label: "すいか" },
  {value: "49300", label: "キウイフルツ" },
  {value: "50100", label: "バナナ" },
  {value: "50300", label: "パイナップル" },
  {value: "50400", label: "レモン" },
  {value: "50500", label: "グレプフルツ" },
  {value: "50600", label: "オレンジ" },
  {value: "50700", label: "輸入おうとう" },
  {value: "50800", label: "輸入キウイ" },
  {value: "50850", label: "輸入メロン" }
]


//ソート
options.sort(function(a,b) {
  if(a.label > b.label) {
    return 1;
  } 
  if (a.label < b.label) {
    return -1
  }
  return 0;
});


const DropdownSelect:React.FunctionComponent<{UpdatefoodList: any}> = ({UpdatefoodList}) => {
    function onClickHandler(food) {
        console.log(food)
        if (food.length === 0) {UpdatefoodList(["", 0])}
        for (var i = 0; i < food.length; i++) {
            UpdatefoodList([food[i].label, food[i].value, i]);
        }
    }
    return (
      <Select isMulti name="food" options={options} onChange={(e) => onClickHandler(e)}/>

    )
  }


export default DropdownSelect