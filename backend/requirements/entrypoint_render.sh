#!/bin/sh

set -e  # エラーで停止

echo "📦 Running migrations..."
python manage.py migrate --noinput

echo "🧹 Collecting static files..."
python manage.py collectstatic --noinput --clear --verbosity 0

echo "👑 Creating superuser if not exists..."
python manage.py shell <<EOF
from django.contrib.auth import get_user_model
User = get_user_model()
username = "adminmaster"
email = "admin@example.com"

from django.utils.crypto import get_random_string
password = get_random_string(length=16)

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username=username, email=email, password=password)
    print("✅ Superuser created:", username)
else:
    print("ℹ️ Superuser already exists:", username)

print("password", password)
EOF

echo "🚀 Starting Gunicorn..."
exec gunicorn config.wsgi:application --bind 0.0.0.0:$PORT --workers 3
