/**
 * 負荷軽減用ワーカー
 * 無関係のリクエストをオリジンまで到達させないためのものです
 * 想定しているリクエスト内容でなければ404を返します
 */
export default {
	async fetch(request, env, ctx) {
		const userAgent = request.headers.get('User-Agent') || '';

		// Discord や X(Twitter) などの URL プレビュー用 Bot 判定
		const previewBots = {
			discordbot: /Discordbot/i,
			twitterbot: /Twitterbot/i,
			'slackbot-linkexpanding': /Slackbot-LinkExpanding/i,
			facebookbot: /facebookexternalhit|Facebot/i,
			linkedinbot: /LinkedInBot/i,
			pinterestbot: /Pinterestbot/i,
			telegrambot: /TelegramBot/i,
		};

		const detectPreviewBot = userAgent => {
			for (const [botName, regex] of Object.entries(previewBots)) {
				if (regex.test(userAgent)) {
					return {
						isBot: true,
						botName,
						userAgent,
					};
				}
			}

			return { isBot: false, userAgent };
		};

		const bot = detectPreviewBot(userAgent);

		// プレビュー用 Bot からのリクエストは、そのままプロキシ
		if (bot.isBot) {
			return fetch(request);
		}

		// auth-keyクッキーの値の確認
		const cookieHeader = request.headers.get('Cookie');
		const authKey = cookieHeader
			? cookieHeader
					.split(';')
					.find(c => c.trim().startsWith('authkey='))
					?.split('=')[1]
			: null;

		// クッキーが存在しない場合、404 HTMLを返却
		if (!authKey) {
			const html404 = `
<!doctype html>
<html lang="ja" data-theme="dark">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>XDiff 404</title>
		<style>
			:root {
				--bg: oklch(0.145 0 0); /* 外側の背景色 */
				--container-bg: oklch(0.269 0 0); /* 内側の背景色 */
				--border: oklch(1 0 0 / 10%); /* ボーダーカラー */
				--fg: #e2e8f0; /* メイン文字色 */
				--muted: oklch(0.708 0 0); /* セカンダリ文字色 */
				--accent: #818cf8; /* ボタン背景色 */
				--accent-hover: #6366f1; /* ボタンホバー色 */
			}
			[data-theme="dark"] {
				background-color: var(--bg);
				color: var(--fg);
			}
			*,
			*::before,
			*::after {
				box-sizing: border-box;
			}
			body {
				margin: 0;
				font-family: "Inter", sans-serif;
				background-color: var(--bg);
				color: var(--fg);
				text-align: center;
				padding: 2rem 1rem;
				display: flex;
				align-items: center;
				justify-content: center;
				min-height: 100vh;
			}
			.container {
				width: 100%;
				max-width: 32rem;
				margin: 0 auto;
				border: 1px solid var(--border);
				border-radius: 0.5rem;
				padding: 2rem;
				background-color: var(--container-bg);
			}
			.logo {
				width: 120px;
				height: auto;
				margin-bottom: 0.5rem;
				max-width: 100%;
			}
			h1 {
				font-size: 2.5rem;
				margin-bottom: 0.5rem;
				color: var(--fg);
			}
			p {
				font-size: 1rem;
				margin: 1rem 0 2rem;
				color: var(--muted);
				line-height: 1.6;
			}
			/* ここから system-message 専用スタイル（追加部分） */
			.system-message {
				background-color: oklch(0.2 0 0);
				border: 1px solid oklch(1 0 0 / 5%);
				border-radius: 0.25rem;
				padding: 0.5rem 0.75rem;
				margin: 1rem 0 1.5rem;
				font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
				font-size: 0.75rem;
				color: oklch(0.65 0 0);
				text-align: left;
				line-height: 1.4;
			}
			/* ここまで system-message 専用スタイル */
			.reload-btn {
				display: inline-block;
				padding: 0.75rem 1.5rem;
				font-size: 1rem;
				font-weight: 500;
				color: #fff;
				background-color: var(--accent);
				border: none;
				border-radius: 0.375rem;
				cursor: pointer;
				transition: background-color 0.2s ease;
			}
			.reload-btn:hover {
				background-color: var(--accent-hover);
			}
			@media (max-width: 640px) {
				.container {
					padding: 1.5rem;
				}
				.logo {
					width: 100px;
					margin-bottom: 1.5rem;
				}
				h1 {
					font-size: 2rem;
				}
				p {
					font-size: 0.95rem;
				}
				/* system-message のレスポンシブ対応（追加） */
				.system-message {
					font-size: 0.7rem;
					padding: 0.4rem 0.6rem;
				}
				.reload-btn {
					width: 100%;
					padding: 0.75rem;
					font-size: 0.95rem;
				}
			}
			@media (min-width: 1024px) {
				.logo {
					width: 140px;
					margin-bottom: 0rem;
				}
				h1 {
					font-size: 3rem;
				}
				p {
					font-size: 1.125rem;
				}
				/* system-message のレスポンシブ対応（追加） */
				.system-message {
					font-size: 0.8rem;
				}
				.reload-btn {
					font-size: 1.125rem;
				}
			}
		</style>
	</head>
	<body>
		<div class="container">
			<img
				src="data:image/png;base64,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"
				alt="Logo"
				class="logo"
			/>
			<h2>ページが見つかりません</h2>
			<p>URLが合っているか確認してください。</p>
			<div class="system-message">
				リクエストを処理できませんでした<br />
			</div>
			<button id="reloadBtn" class="reload-btn" onclick="location.reload()"
				>再読み込み</button
			>
		</div>
	</body>
</html>
`;

			return new Response(html404, {
				status: 404,
				headers: {
					'Content-Type': 'text/html; charset=utf-8',
				},
			});
		}

		// クッキーが存在する場合、リクエストをそのままプロキシ
		return fetch(request);
	},
};
