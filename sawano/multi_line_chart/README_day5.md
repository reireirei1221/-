# day5のコミット

## data.csv
multi_line_chart.htmlで読むscvファイル
各日ごとのNewYork, San Francisco, Austinの気温データ

## multi_line_chart.html
NewYork, San Francisco, Austinの気温の変化が折れ線グラフで重ねて表示される。
また、カーソルをグラフ上におくと、そのx座標における各都市の気温が同時に表示され、比較できる。
NewYork, San Francisco, Austin, それぞれのボタンを押すと、その都市のデータだけ消え、再度同じボタンを押すと再びその都市のデータが現れる。これにより、好きなデータを好きな個数だけ比較できる

## 上の参考URL
https://bl.ocks.org/LemoNode/a9dc1a454fdc80ff2a738a9990935e9d
このままだと動かないので、d7対応するように一部改変した。
またデータを選択できる機能のボタンを追加した。

## まったく別のグラフ表示コード
http://bl.ocks.org/Thanaporn-sk/5acb5a244ae976e0c9780d8450c39efb
範囲選択すると拡大する棒グラフ 動作確認済み

http://bl.ocks.org/wizicer/f662a0b04425fc0f7489
個人的に最終的な形にしたいレイアウト Sunburst型 動作確認済み

https://www.d3-graph-gallery.com/graph/line_several_group.html
普通の複数グラフの表示

https://observablehq.com/@d3/multi-line-chart
班員が教えてくれた複数グラフの表示 動作確認未




