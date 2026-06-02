# settings/dev.py

from .base import *
DEBUG = True
from datetime import timedelta

# ========================
# Cookie & CSRF設定（ローカル開発用・HTTP対応）
# ========================

CSRF_COOKIE_SECURE = False  # safariはsecureなcookieをローカルで受け取れないため、開発時はFalseにする
CSRF_COOKIE_HTTPONLY = True  # 開発時は柔軟に
CSRF_COOKIE_SAMESITE = "lax"

SESSION_COOKIE_SECURE = False
SESSION_COOKIE_HTTPONLY = True  # 開発時は柔軟に
SESSION_COOKIE_SAMESITE = "lax"

ALLOWED_HOSTS = os.environ.get("DJANGO_ALLOWED_HOSTS", "127.0.0.1").split(",")

ALLOWED_HOSTS += [
    "django-web",
]

SIMPLE_JWT = {  
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
}
CSRF_TRUSTED_ORIGINS = [
    "http://localhost",
    "http://localhost:3000",
]

REST_AUTH = {
    'PASSWORD_RESET_SERIALIZER': 'custom_auth.password_reset.serializer.CustomPasswordResetSerializer',
    'USE_JWT': True,
    'JWT_AUTH_COOKIE': 'access',
    'JWT_AUTH_REFRESH_COOKIE': 'refresh',
    'JWT_AUTH_HTTPONLY': True,
    'JWT_AUTH_SECURE': False,   # safariはsecureなcookieをローカルで受け取れないため、開発時はFalseにする
    'JWT_AUTH_SAMESITE': 'lax',
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
