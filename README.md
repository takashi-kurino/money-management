# プロジェクト概要

JWT認証付きの家計簿アプリ。収支の記録・カテゴリ管理・月別統計を機能として持つ。

Django + Next.js のフルスタック構成で、認証フローの設計（BFFパターン / HttpOnly Cookie）や
フロント・バックエンド分離のアーキテクチャを実装することを主な目的として開発。

設計思想・開発記録：[Notion](https://app.notion.com/p/Takashi-Kurino-Portfolio-356bb43e5cae8015900cc17d23b639bb?source=copy_link)

## デプロイURL

https://money-management-three-nu.vercel.app/
⚠️起動に1~2分かかります

## 技術スタック

| カテゴリ | 技術 |
|----------|------|
| Frontend | Next.js (Route Handler App Router) / React / TypeScript / Tailwind CSS |
| Backend  | Django / Django REST Framework |
| Auth     | dj-rest-auth / SimpleJWT / HttpOnly Cookie |
| Database | PostgreSQL (Neon) |
| Infra    | Docker / Docker Compose |
| Deploy   | Vercel / Render |

## アーキテクチャ図

[draw.io](https://drive.google.com/file/d/1XID0lPSdVMnqqwqC2N5q2apjLaragoew/view?usp=sharing)

## ローカル起動手順

```bash
git clone https://github.com/takashi-kurino/money-management.git
```

フロント側のインポート

```bash
cd frontend
npm install
```

バックエンド側のインポート

```bash
cd backend
python -m ensurepip --upgrade
python -m pip install --upgrade pip setuptools wheel
python -m venv .venv
source .venv/bin/activate
pip install -r requirements/debug.txt
```

docker起動

```bash
docoker compose up
```

docker 停止

```bash
docoker compose down
```

## envファイルの作成

```bash
cp .env.example .env
```

---

**Notionに残すもの（GitHubには不要）**

- AI活用の考察
- 苦労した点の詳細
- ワイヤーフレームの経緯
- デプロイサービス選定の比較表
- 進捗管理

---

採用担当やエンジニアがGitHubを見るとき、まず「動かせるか」「スタックが分かるか」を確認するので、READMEはそこに集中させてNotionへの詳細リンクを添えるのがベストだと思います。
