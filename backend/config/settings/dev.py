# settings/dev.py

from .base import *
DEBUG = True

from datetime import timedelta
# ========================
# Local Development Overrides - HTTP Only
# ========================

# ========================
# Cookie & CSRF設定（ローカル開発用・HTTP対応）
# ========================

JWT_AUTH_HTTPONLY = True
JWT_AUTH_SAMESITE = "Lax"
JWT_AUTH_SECURE = False  # dev
CSRF_COOKIE_SECURE = False

SESSION_COOKIE_SECURE = False

ALLOWED_HOSTS = os.environ.get("DJANGO_ALLOWED_HOSTS", "127.0.0.1").split(",")

ALLOWED_HOSTS += [
    "localhost",
    "127.0.0.1",
    "django-web",
    "django-web:8000",
]

CSRF_TRUSTED_ORIGINS = [
    "http://localhost",
    "http://localhost:8000",
]

REST_AUTH = {
    'PASSWORD_RESET_SERIALIZER': 'custom_auth.password_reset.serializer.CustomPasswordResetSerializer',
    'USE_JWT': True,
    'JWT_AUTH_COOKIE': 'access',
    'JWT_AUTH_REFRESH_COOKIE': 'refresh',
    'JWT_AUTH_HTTPONLY': False,
    'JWT_AUTH_SECURE': False,      # debug now
    'JWT_AUTH_SAMESITE': 'Lax',
}

# ========================
# dev用 Database（デフォルト: .env の値を参照）
# ========================

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.{}'.format(
            os.getenv('DATABASE_ENGINE', 'postgresql')
        ),
        'NAME': os.getenv('DATABASE_NAME', 'postgres'),
        'USER': os.getenv('DATABASE_USERNAME', 'postgres'),
        'PASSWORD': os.getenv('DATABASE_PASSWORD', 'postgres'),
        'HOST': os.getenv('DATABASE_HOST', 'db'),
        'PORT': os.getenv('DATABASE_PORT', 5432),
    }
}

# ========================
# Email Backend（ローカル開発用: コンソール出力）
# ========================
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'


# ========================
# ロギング設定（デバッグ用）
# ========================
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django.request': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': True,
        },
        'rest_framework': {
            'handlers': ['console'],
            'level': 'DEBUG',
        },
    },
}
# Gmail 設定を使いたい場合は以下をコメント解除して .env に設定
# EMAIL_BACKEND = os.getenv("EMAIL_BACKEND", "django.core.mail.backends.smtp.EmailBackend")

# EMAIL_HOST = os.getenv("EMAIL_HOST", "smtp.gmail.com")
# EMAIL_PORT = int(os.getenv("EMAIL_PORT", 587))
# EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER")
# EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD")
# EMAIL_USE_TLS = os.getenv("EMAIL_USE_TLS", "True") == "True"