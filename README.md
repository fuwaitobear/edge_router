# edge_router

Cloudflare Worker for edge routing and proxying requests.

* CloudflareのBuild機能によってデプロイします。
* GitHubのmainブランチへpush後、自動デプロイされます。またはCloudflare Web画面上からデプロイボタンでデプロイします。

```
* 負荷軽減用ワーカー
* 無関係のリクエストをオリジンまで到達させないためのものです
* 想定しているリクエスト内容でなければ404を返します
```
