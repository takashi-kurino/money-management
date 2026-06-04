# コマンド

## Docker操作

### ビルド

```bash
docker compose up --build
```

### 起動

```bash
docker compose up 
```

### 停止

```bash
docker compose down
```

### キャッシュをクリア

```bash
docker system prune -a
```

## ホットリロード付きビルド

```bash
docker compose -f compose.yml -f compose.dev.yml up --build
```

### 停止

```bash
docker-compose -f compose.yml -f compose.dev.yml down
```

### 再ビルド

```bash
docker-compose -f compose.yml -f compose.dev.yml up --build
```

### 環境指定ビルド

```bash
docker compose -f compose.yml -f compose.dev.yml build nextjs-web
```

## 開発環境設定

```bash
brew install pnpm
brew install python

cd frontend
npm install

cd backend
python -m ensurepip --upgrade
python -m pip install --upgrade pip setuptools wheel

python -m venv .venv
source .venv/bin/activate

pip install -r requirements/debug.txt
```

## envファイルの作成

```bash
cp .env.example .env
```
