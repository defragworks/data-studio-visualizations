# 準備
このプロジェクトでは、次のライブラリを使用しています。

- Data Studio Community Component Library
    - https://developers.google.com/datastudio/visualization/library
- Chart.js
    - https://www.chartjs.org/
    - https://www.chartjs.org/docs/latest/getting-started/installation.html

以下のパスにファイルを配置します。

- js/dscc.min.js
- js/chart_js/Chart.bundle.min.js


# ビルド
Community Visualizationのライブラリであるdscc.min.js、Chart.bundle.min.js、myVizSource.jsを結合してmyViz.jsを作成します。myVizSource.jsではなくmyViz.jsをアップロードします。

## Mac / Linux
準備中
(dscc.min.js, Chart.bundle.min.js, myVizSource.jsのファイルを連結する)

## Windows (PowerShell)
以下のコマンドでmyViz.jsを作成します。

```
Clear-Content myViz.js; Add-Content -Path .\myViz.js -Value (Get-Content -Path .\js\dscc.min.js); Add-Content -Path .\myViz.js -Value (Get-Content -Path .\js\chart_js\Chart.bundle.min.js); Add-Content -Path .\myViz.js -Value (Get-Content -Path .\myVizSource.js)
```

# アップロードと確認
使用するGoogle Cloud Storageのバケット名を ``` take-a-look-visualizations ``` としています。異なる場合は置き換えをお願いします。

## アップロード
Google Cloud SDK( https://cloud.google.com/sdk/docs/ )をインストールしてから以下のコマンドを実行します。

アップロードするファイルは次のものになります。

- manifest.json
- myViz.css
- myviz.json
- myViz.js

例(myViz.jsのアップロード):
```
gsutil cp -a public-read myViz.js gs://take-a-look-visualizations/viz/
```


## 確認

### 初めて作成するとき
注意: データソースを追加する際に、コミュニティ由来ビジュアル表示を使うことを許可する必要があります。

コミュニティ由来ビジュアル表示の追加時には以下を指定します。

- マニフェストパス(開発環境のGoolge Cloud Storageのバケット名に合わせます)
    - gs://take-a-look-visualizations/viz/
- コンポーネントID
    - radar

### 更新
アップロードが完了したら動作の確認を行いますが、ブラウザのリロードを押すほうが確実に更新された結果をみれるようです。
