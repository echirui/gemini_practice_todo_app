# GEMINI.md

## プロジェクト概要

シンプルなTodo管理アプリケーション。タスクの作成、表示、更新、削除（CRUD）機能を持つ。

## 技術スタック

- **フロントエンド**: React
- **ルーティング**: React Router v7
- **ビルドツール**: Vite
- **データベース**: SQLite (Cloudflare D1)
- **単体・コンポーネントテスト**: Vitest
- **E2Eテスト**: Playwright
- **デプロイ**: Cloudflare Workers / Cloudflare Pages
- **CLI**: Wrangler

## ディレクトリ構成 (想定)

```
/
├── e2e/                  # Playwright E2Eテスト
├── public/               # 静的アセット
├── src/                  # Reactフロントエンドソースコード
│   ├── components/       # 再利用可能なコンポーネント
│   ├── routes/           # 各ページのコンポーネント
│   ├── App.tsx           # アプリケーションのメインコンポーネントとルーティング
│   └── main.tsx          # Reactアプリケーションのエントリーポイント
├── functions/            # Cloudflare Workersのバックエンド関数
│   └── api/              # APIエンドポイント
│       └── [[path]].ts   # 全てのリクエストを処理するワーカー
├── package.json
├── tsconfig.json
├── vite.config.ts
└── wrangler.toml         # Cloudflare Workersの設定ファイル
```

## 主なコマンド

- `npm run dev`: 開発サーバーを起動します (Vite + Wrangler)。このコマンドはバックグラウンドで実行されます。
- `npm run build`: 本番用にプロジェクトをビルドします
- `npm run test`: Vitestによる単体テストを実行します
- `npm run test:e2e`: PlaywrightによるE2Eテストを実行します
- `npm run deploy`: Cloudflareにデプロイします

## コードスタイル

- ESモジュール (`import`/`export`) を使用します。
- Reactコンポーネントは関数コンポーネントとHooksで記述します。
- 型安全のため、可能な限りTypeScriptの型を活用します。
- インポート時は分割代入 (`import { a } from 'b'`) を優先します。

## データベース

- Cloudflare D1をデータベースとして使用します。D1はSQLite互換のAPIを提供します。
- データベースのスキーマは `functions/db/schema.sql` のようなファイルで管理します。
- データベースとのやり取りは、`functions` ディレクトリ内のCloudflare Workerを介して行います。

## デプロイ

- `wrangler deploy` コマンドを使用して、Cloudflareにデプロイします。
- `wrangler.toml` ファイルがデプロイ設定を管理します。フロントエンド（Pages）とバックエンド（Workers）の連携もここで設定します。