frontend
    認証はBFFを採用。
    /api/authはnext経由にnginxのルートを設定。

BFFを利用するメリット

Next.js サーバーが BFF（Backend for Frontend） として機能する
HttpOnly cookie を安全にセットできる
クライアントは /api/auth/login を叩くだけ（DRF の存在を知らなくていい）
レスポンス・ステータスコード・ヘッダーを自由に制御できる
ログアウト（cookie 削除）も同じパターンで統一できる

| | Client | Server Action | Route Handler |
|---|---|---|---|
| HttpOnly cookie セット | ❌ | △（手動） | ✅ |
| BFF パターン | ❌ | △ | ✅ |
| エラーハンドリング | △ | △ | ✅ |
| ポートフォリオ的な説明のしやすさ | ❌ | △ | ✅ |

Server Action は「ログイン」よりも「ログイン後のデータ作成・更新」に使うのが自然なので、認証フローは Route Handler に寄せるのが設計として綺麗だよ。

Server Action ----------------------

Server Action はもともと「フォーム送信 → DB 操作 → revalidate」のユースケース向け
レスポンスに Set-Cookie ヘッダーをそのままブラウザに転送するのが難しい（自前で cookies().set() する必要がある）
リダイレクト制御が redirect() に縛られる
エラーハンドリングが少し扱いにくい（例外ベース）

クライアントコンポーネント --------------------
レスポンスの JWT トークンを localStorage か document.cookie に保存するしかない
HttpOnly cookie にクライアントからは書き込めない
JS から読めるクッキーは XSS に弱い
CORS 設定も必要になる