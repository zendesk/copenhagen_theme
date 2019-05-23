# Macaso Theme by ExciteOne

MacasoテーマはZendesk社提供しているCopenhagenテーマを拡張したものです。
(Copenhagenテーマのリポジトリはここ: https://github.com/zendesk/copenhagen_theme)

＃　参考情報
テンプレート管理URL: https://exciteone.zendesk.com/theming/workbench
テンプレート仕組み説明URL: https://developer.zendesk.com/apps/docs/help-center-templates/introduction

＃テーマをローカルで編集して確認する方法（Docker版）
1. リポジトリのトップフォルダーへcd
2. Dockerイメージを作成：
  ```
  docker build -t zat .
  ```
3.　ZATの theme previewを立ち上げる
  （詳細説明はここ：https://support.zendesk.com/hc/ja/articles/115012793547）
  ```
  docker run -it -v $PWD:/zat -p 4567:4567 zat zat theme preview
  ```

#テーマをZendeskにアップロードする方法
1. ブラウザーで　https://exciteone.zendesk.com/theming/workbench に移動
2. Macasoテーマのハンバーグボタンを押して、「GitHubから更新」を押して、最新masterブランチに更新する。
