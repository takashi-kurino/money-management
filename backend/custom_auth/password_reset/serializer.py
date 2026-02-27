import os
from dj_rest_auth.serializers import PasswordResetSerializer
from dj_rest_auth.forms import user_pk_to_url_str

NEXT_PUBLIC_URL = os.getenv("NEXT_PUBLIC_URL")

def custom_url_generator(request, user, temp_key):
    id = user_pk_to_url_str(user)
    return f'{NEXT_PUBLIC_URL}/password-reset/confirm?uid={id}&token={temp_key}'

class CustomPasswordResetSerializer(PasswordResetSerializer):

    def get_email_options(self, **kwargs):
        return {
            'url_generator': custom_url_generator,
        }
