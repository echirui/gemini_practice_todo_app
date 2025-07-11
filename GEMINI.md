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

### コミット
`commitして`という指示があった場合、変更をステージングしてからコミットします。
コミットメッセージは英語で記述してください。

### コミットメッセージの作成
複数行のコミットメッセージを作成する場合、以下の手順でコミットしてください。
1. コミットメッセージを一時ファイルに書き込みます。
   `write_file(content="<コミットメッセージ>", file_path="/workspace/commit_message.txt")`
2. 一時ファイルを指定してコミットします。
   `git commit -F /workspace/commit_message.txt`
3. コミット後、一時ファイルを削除します。
   `rm /workspace/commit_message.txt`

### Issueの確認
`issueを確認して`という指示があった場合、`gh issue view <issue番号>`または`gh issue list`を使用します。

### Issueの登録
`issueを登録して`という指示があった場合、以下の手順でissueを登録します。
issueのタイトルと本文は日本語で記述してください。
1. issueの本文を一時ファイルに書き込みます。
   `write_file(content="<issue本文>", file_path="/workspace/issue_body.md")`
2. 一時ファイルを指定してissueを登録します。
   `gh issue create --title "<issueタイトル>" --body-file /workspace/issue_body.md`
3. issue登録後、一時ファイルを削除します。
   `rm /workspace/issue_body.md`

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