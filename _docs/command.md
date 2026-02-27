# docker command

```起動コマンド
docker compose down
docker compose up
```

## その他コマンド

```コンテナ作成
docker compose build
```

```コンテナ起動
docker compose up
```

```コンテナ停止
docker compose down
```

```作成後起動  （プログラム書き換え後反映もこれ）
docker compose up --build
```

```各環境への入り方
docker compose exec (compose.yml service_name) bash 
```

```それぞれの環境に入る。
docker compose exec django-web bash
docker compose exec nextjs-web bash
docker compose exec db bash
docker compose exec nginx bash
```

```dockerから指定して実行する場合。
docker compose exec (compose.yml service_name) ...各アプリコマンド
```

```django  buildしたらdb作成後、superuser作成する。
docker compose exec django-web python manage.py makemigrations
docker compose exec django-web python manage.py migrate
docker compose exec django-web python manage.py createsuperuser
```

```nginx 静的ファイルを入れるので下のプログラム必要
docker compose exec django-web python manage.py collectstatic --noinput
```

## ファイルを指定して起動

```ローカル開発
docker compose -f compose.yml -f compose.dev.yml up --build
```

```本番
docker compose -f compose.yml up --build
```

# 開発環境設定

```コマンド
brew install npm
brew install python

cd frontend
npm install

cd backend
python -m ensurepip --upgrade
python -m pip install --upgrade pip setuptools wheel

python -m venv .venv
source .venv/bin/activate

pip install -r requirements_locla.txt
```

## envファイルの作成

```envファイル
cp .env.example .env
```

# 実運用ではさらにやること

静的ファイル収集 (python manage.py collectstatic)
gunicorn や uvicorn などの本番用 WSGI/ASGI サーバーに切り替え
nginxのlocatiln _nextを削除

## 設定ファイルの分割について
このリポジトリは設定を分割済みです（`backend/config/settings/`）。以下の3つの環境用設定があります：

### 設定ファイル一覧
- `config.settings.base` — 全環境で共有される基本設定
- `config.settings.dev` — 開発用（DEBUG=true）
- `config.settings.local` — ローカル Docker 開発用（DEBUG=true、HTTP対応、コンソールメール）
- `config.settings.prod` — 本番用（DEBUG=false、HTTPS必須）

### 環境別の起動方法

#### 1. ローカル開発（Docker Compose の override を使用）— 推奨
```bash
docker compose up --build
```
- 設定: `config.settings.local`（compose.override.yml で指定）
- 特徴: HTTP対応、コンソールメール、localhost/127.0.0.1/django-web ホスト許可

#### 2. 本番風起動（override を無視）
```bash
docker compose -f compose.yml up -d
```
- 設定: `config.settings.prod`（compose.yml で指定）
- 特徴: HTTPS必須、本番用 ALLOWED_HOSTS、CSRF/Cookie セキュア設定

#### 3. 明示的に dev 設定を使う（override 込み）
```bash
DJANGO_SETTINGS_MODULE=config.settings.dev docker compose up
```

### 環境変数で設定を切り替える例
```bash
# 本番環境で異なる設定を使いたい場合
DJANGO_SETTINGS_MODULE=config.settings.prod docker compose -f compose.yml up -d
```