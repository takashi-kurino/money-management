# prod.py
from .base import *
DEBUG = False

SECURE_SSL_REDIRECT = True

CSRF_COOKIE_SECURE = True
CSRF_COOKIE_SAMESITE = "lax"
CSRF_COOKIE_HTTPONLY = True

SESSION_COOKIE_SECURE = True
SESSION_COOKIE_SAMESITE = "lax"

REST_AUTH = {
    'PASSWORD_RESET_SERIALIZER': 'custom_auth.password_reset.serializer.CustomPasswordResetSerializer',
    'USE_JWT': True,
    'JWT_AUTH_COOKIE': 'access',
    'JWT_AUTH_REFRESH_COOKIE': 'refresh',
    'JWT_AUTH_HEADER_PREFIX': 'Bearer',
    'JWT_AUTH_HTTPONLY': True,
    'JWT_AUTH_SECURE': True,
    'JWT_AUTH_SAMESITE': 'lax',
    'OLD_PASSWORD_FIELD_ENABLED': True,
}

SIMPLE_JWT = {  
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
}

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        "dj_rest_auth.jwt_auth.JWTCookieAuthentication",
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
    ),
}
