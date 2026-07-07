# こどもNISA研究所

2027年1月開始の「こどもNISA（未成年者特定累積投資勘定）」を解説する情報サイト。
本番: https://www.kodomo-nisa.jp （apex ドメインは www へリダイレクト）

## 技術構成

- Next.js 16 (App Router) + TypeScript + Tailwind CSS 4 + framer-motion
- グラフ: recharts / PDF出力: jspdf + html2canvas / メール送信: Resend

## 開発

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # 本番ビルド
npm run lint
```

## デプロイ

- **本番は Vercel**（GitHub 連携で main への push ごとに自動デプロイ）。
  お問い合わせフォームの API ルート（`src/app/api/contact/route.ts`）は Vercel 上でのみ動作する。
  環境変数 `RESEND_API_KEY` が必要。
- `.github/workflows/deploy.yml` は GitHub Pages への静的エクスポートデプロイ（`NEXT_EXPORT=true`）。
  **本番ドメインは Vercel が配信しているため現在は冗長**で、github.io 上に複製サイトが公開され
  重複コンテンツの SEO リスクがある。不要ならこのワークフローを削除し、リポジトリの
  Settings → Pages で公開を停止すること。

## 自動化（GitHub Actions）

| ワークフロー | 頻度 | 内容 |
|---|---|---|
| `update-fear-greed.yml` | 毎営業日2回 | 日本版 Fear & Greed Index のデータ更新（`scripts/fetch_data.py` → `public/fear-greed/data.json`） |
| `auto-update-news.yml` | 毎週月曜 21:00 JST | 金融庁・財務省・日銀の公式RSSからNISA関連の新着を検出し、`src/data/news.ts` に自動追加して直接コミット（`scripts/auto_update_news.py`）。LLM不使用・公式タイトルとリンクのみ追加するため無課金かつ誤情報リスクなし。型チェック通過時のみpush |
| `check-news-sources.yml` | 毎週月曜 9:00 JST | 金融庁・財務省・日銀の監視ページの更新を検知し、変更があれば Issue を起票（`scripts/check_news_sources.py`）。RSSに乗らないページ改訂の検知用 |

## コンテンツの更新手順

- **ホームのニュース欄**: 官公庁の新着は `auto-update-news.yml` が毎日自動追加する。
  手動で足す場合は `src/data/news.ts` の配列の先頭に項目を追加する（表示は最新6件のみ）。
- **記事**: `src/lib/articles.ts` に追加する。`slug` を追加すると
  `/policy-curation/[slug]` の静的ページと sitemap に自動反映される。
  既存記事を改訂したら `dateModified` を設定する（JSON-LD の dateModified に使われる）。
- **AI向けサマリー**: 制度情報を更新したら `src/app/page.tsx` の `AI_CONTENT_SUMMARY` にある
  `Last Verified` と、`src/lib/ai-optimization.ts` の `CALCULATOR_METADATA.lastUpdated` も更新する。
- **金利などの市況前提**: `src/lib/calculator.ts` の定数（`BANK_RATE` など）と
  `src/components/simulator/ComparisonChart.tsx` の表示ラベルをセットで更新する。

## 正規ドメインの注意

構造化データ・sitemap・canonical はすべて `https://www.kodomo-nisa.jp` に統一している。
新しくURLをハードコードする場合も必ず www 付きを使うこと。
