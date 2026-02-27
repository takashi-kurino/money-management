# prod.py
DEBUG = False
from .base import *
from datetime import timedelta

SECURE_SSL_REDIRECT = True

CSRF_COOKIE_SECURE = True
CSRF_COOKIE_SAMESITE = "None"

REST_AUTH = {
    'PASSWORD_RESET_SERIALIZER': 'custom_auth.password_reset.serializer.CustomPasswordResetSerializer',
    'USE_JWT': True,
    'JWT_AUTH_COOKIE': 'access',
    'JWT_AUTH_REFRESH_COOKIE': 'refresh',
    'JWT_AUTH_HEADER_PREFIX': 'Bearer',
    'OLD_PASSWORD_FIELD_ENABLED': True,
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
