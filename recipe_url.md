# スクレイピングの方法の模索 (役に立ちそうなURLをあげております)

## 下準備
MacのSafariで「要素を検証」するショートカットキーと、開発メニューの表示方法
https://delaymania.com/201910/mac/mac-safari-shortcut-dev/

スクレイピングに使えるライブラリ　BeautifulSoup, Scrapyなど の紹介
https://www.pasonatech.co.jp/workstyle/column/detail.html?p=2638

## BeautifulSoupの使い方
図解！Python BeautifulSoupの使い方を徹底解説！(select、find、find_all、インストール、スクレイピングなど)
https://ai-inter1.com/beautifulsoup_1/#st-toc-h-8

## 実際にクックパッドをスクレイピングしてみた記事
【Python】レシピサイトから「本当に求めているレシピ」を紹介するシステムを作ってみた！
collab上でこのままコピーしても動かなかったので、GetRecipeURL関数を一部改変する必要があると思われる
https://qiita.com/HanBei/items/4e9431572e970f0bcc2c


## クックパッド以外のレシピデータ
クックパッドは誰でも投稿できる反面、材料の単位や名称が不統一で、それらすべてに対応するのは難しいので、他の海外のレシピデータも使えるかなと思いました。ただ日本の市場のデータを使用するなら、あまり役に立たないとも思います。
Vegan用のレシピデータ
https://www.eat-vegan.rocks/de/kraeuter-knoblauchbaguette-vegan-schnell-lecker/

料理に偏りがありそうだが、食材の単位や数値が統制されている？
http://funcook.com/

他にもいくつかあるみたいなので、列挙しておきます

http://www.epicurious.com/

http://www.williams-sonoma.com/

http://foodnetwork.com/

http://www.essen-und-trinken.de

hRecipe
http://microformats.org/wiki/hrecipe

## アメリカの食材の小売価格
結局、日本の市場のデータを使用することになったので、没になったが、膨大な食材の種類とデータ数を網羅し、また時系列でグラフ化しています。
https://www.bls.gov/regions/mid-atlantic/data/averageretailfoodandenergyprices_usandwest_table.htm

