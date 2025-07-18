## feat: タスク管理機能の全面的な改善とUI/UXデザインの刷新 (#9, #11, #13/14, #15/16, #17/18)

### 概要:
このプルリクエストは、Issue #9 で要求されたタスク管理機能の追加に加え、関連するデザイン改善Issue (#11, #13/14, #15/16, #17/18) に対応するための包括的な変更を含んでいます。タスクのCRUD操作、タブによるフィルタリング、視覚的なフィードバック、および全体的なUI/UXの向上を実現しました。

### 主な変更点:

1.  **タスク管理機能の追加 (Issue #9):**
    *   **タスク作成フロー:** `TodoList.tsx` にフローティングの「+」ボタンを追加し、`TaskModal` を介して新しいタスク（タイトル、内容）を追加できるようにしました。タスクは新しいAPIエンドポイント (`/api/tasks` POST) を通じてD1データベースに永続化されます。
    *   **タブベースのフィルタリング:** `home.tsx` に `Tabs.tsx` コンポーネントを統合し、「すべて」「未実施」「実施済み」でタスクをフィルタリングできるようにしました。
    *   **タスク完了の視覚的フィードバック:** `TaskItem.tsx` でタスク完了時に半透明化 (`opacity: 0.5`) とスムーズなトランジションを適用し、視覚的に状態がわかるようにしました。
    *   **タスク内容のアコーディオン表示:** `TaskItem.tsx` でタスクのタイトルクリック時に内容の表示/非表示を切り替えるアコーディオン機能を実装しました。
    *   **バックエンド統合:** `workers/app.ts` にHonoとDrizzle ORMを使用したタスクのGET, POST, PUT, DELETE APIエンドポイントを実装し、D1データベースとの連携を強化しました。
    *   **データベーススキーマの更新:** `database/schema.ts` を更新し、`tasks` テーブルを導入しました。

2.  **UI/UXデザインの改善 (Issue #11, #13/14, #15/16, #17/18):**
    *   **`TaskModal` の再設計:** ガラスのような透明感のある白いテーマ、暗いオーバーレイ、白いテキスト、洗練された入力フィールドとボタンのスタイルを適用し、マテリアルデザインの原則に沿ったデザインにしました。
    *   **タブUIの強化:** タブに安定した高さ (`min-height`, `overflow-y: auto`) を設定し、アクティブ時とホバー時に変形とボックスシャドウの視覚効果を追加しました。
    *   **削除ボタンのアイコン化:** `TaskItem.tsx` の「Delete」ボタンをゴミ箱アイコンに置き換え、アクセシビリティのために `aria-label` を追加しました。
    *   **レイアウト調整:** `app.css` の `.main-container` を調整し、コンテンツを上部に揃え、上部にパディングを追加してバランスの取れたレイアウトにしました。
    *   **タスク内容表示の統一:** `TaskItem.tsx` 内で展開されるタスク内容の表示領域も `TaskModal` と同様の透明なテーマと白いテキスト色を適用しました。
    *   **初期画面の背景:** `app.css` の `html` および `body` の背景を明るい白ベースの `rgba` 色と `backdrop-filter` でガラス効果を適用しました。

### 技術的詳細:
*   `package.json` に `hono`, `@testing-library/jest-dom`, `@testing-library/react`, `eslint`, `eslint-plugin-react`, `jsdom`, `vitest` などの新しい依存関係を追加しました。
*   `eslint.config.cjs` を追加し、ESLintの設定を導入しました。
*   `vitest.setup.ts` を更新し、テスト環境のセットアップを改善しました。
*   `wrangler.jsonc` の `database_id` を更新しました。

### テスト:
*   `Tabs.test.tsx`, `TaskItem.test.tsx`, `TaskModal.test.tsx` を新規追加し、主要なUIコンポーネントの単体テストを拡充しました。
*   既存の `TodoList.test.tsx` を更新し、新しい機能に対応させました。
*   `npm run test` (Vitest) および `npm run lint` (ESLint) が正常にパスすることを確認済みです。

### レビューアへの依頼:
*   タスクのCRUD操作が意図通りに動作するかご確認ください。
*   各UIコンポーネントのデザインが、ガラスのような透明感とマテリアルデザインの原則に沿っているかご確認ください。
*   特に、`TaskModal` と `TaskItem` の内容表示部分のスタイルをご確認ください。
