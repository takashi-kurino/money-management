# プロジェクト概要

JWT認証付きの家計簿アプリ。収支の記録・カテゴリ管理・月別統計を機能として持つ。

Django + Next.js のフルスタック構成で、認証フローの設計（BFFパターン / HttpOnly Cookie）や
フロント・バックエンド分離のアーキテクチャを実装することを主な目的として開発。

設計思想・開発記録：[Notion](https://app.notion.com/p/Takashi-Kurino-Portfolio-356bb43e5cae8015900cc17d23b639bb?source=copy_link)

## デプロイURL

https://money-management-three-nu.vercel.app/
⚠️起動に1~2分かかります

テストユーザ名:testuser
password:Aa1234567%

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
mkdir playground
cd playground
git clone https://github.com/takashi-kurino/money-management.git
cd money-management
```

### 1 .envファイルの作成

```bash
cp .env.example .env
```

### 2 django secret keyの作成

```bash
python -c "import secrets; print(secrets.token_urlsafe(50))"
```

出力されたものを.envのDJANGO_SECRET_KEYへ貼り付け。

### 3 docker起動

docker ビルド

```bash
docker compose up --build
```

docker 停止

```bash
docker compose down
```
