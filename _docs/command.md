# Docker ボリュームをクリア
docker-compose -f compose.yml -f compose.dev.yml down -v
docker-compose -f compose.yml -f compose.dev.yml down nextjs-web

# キャッシュをクリア
docker system prune -a

# 再ビルド
docker-compose -f compose.yml -f compose.dev.yml up --build
docker-compose -f compose.yml -f compose.dev.yml up --build nextjs-web

#　環境指定ビルド

docker compose -f compose.yml -f compose.dev.yml build nextjs-web

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
