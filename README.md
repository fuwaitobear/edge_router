# edge_router

Cloudflare Worker for edge routing and proxying requests.

* CloudflareのBuild機能によってデプロイします。
* GitHubのmainブランチへのpushで自動デプロイされます。

```
* 負荷軽減用ワーカー
* 無関係のリクエストをオリジンまで到達させないためのものです
* 想定しているリクエスト内容でなければ404を返します
```
