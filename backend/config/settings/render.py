# render.py
from .prod import *

import dj_database_url

ALLOWED_HOSTS += [   
    os.environ.get("RENDER_URL", "").replace("https://", "").replace("http://", ""),
]

INSTALLED_APPS += [
    'corsheaders',  # 追加 render.com用
]

DATABASES = {
    'default': dj_database_url.config(default=os.environ.get('DATABASE_URL'))
}

MIDDLEWARE =[
    'corsheaders.middleware.CorsMiddleware',  # 追加 render.com用
    'django.middleware.common.CommonMiddleware',  # 追加 render.com用
    "whitenoise.middleware.WhiteNoiseMiddleware",  # 追加 静的ファイル配信用 render.com用
] + MIDDLEWARE

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOWED_ORIGINS += [

    os.environ.get("VERCEL_URL"),    # ← フロント側

]   

CSRF_TRUSTED_ORIGINS += [
    os.environ.get("RENDER_URL"),  # ← RenderのURL

    os.environ.get("VERCEL_URL"),    # ← フロント側
]

# Tell Django to copy static assets into a path called `staticfiles` (this is specific to Render)
STATIC_ROOT = '/tmp/staticfiles'

# Enable the WhiteNoise storage backend, which compresses static files to reduce disk use
# and renames the files with unique names for each version to support long-term caching
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'


ACCOUNT_EMAIL_VERIFICATION = "mandatory"  # 'mandatory', 'optional', or 'none'