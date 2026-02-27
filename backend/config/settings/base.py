# base.py

import os
from pathlib import Path
from dotenv import load_dotenv
from datetime import timedelta
DEBUG = True

# base.py から 3 階層上の .env を読み込む
env_path = Path(__file__).resolve().parents[3] / ".env"
load_dotenv(env_path)

# 通常の BASE_DIR
DEFAULT_BASE_DIR = Path(__file__).resolve().parents[3]

# env に BASE_DIR があればそちらを使う
BASE_DIR = Path(os.getenv("BASE_DIR", DEFAULT_BASE_DIR))

NEXT_PUBLIC_URL = os.getenv("NEXT_PUBLIC_URL")
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY")

if not SECRET_KEY:
    raise ValueError("The SECRET_KEY env variable is not set!")

ALLOWED_HOSTS = [
    # 各ファイルに追加
]

# Application definition

AUTH_USER_MODEL = 'users.CustomUser'  # カスタムユーザーモデルを指定

INSTALLED_APPS = [
    'custom_auth',
    'users',
    'transaction',
    
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    'rest_framework',
    'rest_framework.authtoken',
    
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'dj_rest_auth',
    'dj_rest_auth.registration',
    
]

MIDDLEWARE = [
 
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    "allauth.account.middleware.AccountMiddleware",
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASE_URL = os.getenv("DATABASE_URL")

DATABASES = {
    # 各ファイルに追加
}


CORS_ALLOWED_ORIGINS = [
    # 各ファイルに追加
]   

CSRF_TRUSTED_ORIGINS = [
    # 各ファイルに追加
]

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        "dj_rest_auth.jwt_auth.JWTCookieAuthentication",  # simplejwtではなくdj-rest-authの認証クラスを使う
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
}

ACCOUNT_ADAPTER = "custom_auth.registration_verify.adapter.CustomAccountAdapter"

# Cookie設定を全体に反映 renderとvercel通信用--------

# -----------------------------------------------

REST_AUTH = {
    'USE_JWT': True,
    'JWT_AUTH_COOKIE': 'access',
    'JWT_AUTH_REFRESH_COOKIE': 'refresh',
}

if DEBUG:
    SIMPLE_JWT = {  
        'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
        'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
        'ROTATE_REFRESH_TOKENS': True,
        'BLACKLIST_AFTER_ROTATION': True,
    }


# JWT_AUTH_HTTPONLY = True
# JWT_AUTH_SAMESITE = "Lax"


# ========================
# allauth 設定
# ========================
ACCOUNT_SIGNUP_FIELDS = ['email*', 'password1*', 'password2*']
ACCOUNT_EMAIL_VERIFICATION = "mandatory"  # 'mandatory', 'optional', or 'none'
ACCOUNT_AUTHENTICATION_METHOD = "username"  # 'username', 'email', or 'username_email'
ACCOUNT_UNIQUE_EMAIL = True

# ========================
# メール設定（開発用コンソールバックエンド）
# ========================
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend' # 開発用

# # 確認完了後にリダイレクトするURL
LOGIN_REDIRECT_URL = "/"

# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'ja'

TIME_ZONE = 'Asia/Tokyo'

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = Path(__file__).resolve().parent.parent.parent / 'staticfiles'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
