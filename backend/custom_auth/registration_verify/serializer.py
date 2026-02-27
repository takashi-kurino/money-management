# registration-verify/serializers.py
from dj_rest_auth.registration.serializers import RegisterSerializer
from allauth.account.utils import setup_user_email

class CustomRegisterSerializer(RegisterSerializer):
    def custom_signup(self, request, user):
        # 必要ならユーザー作成時の追加処理
        pass

    def save(self, request):
        user = super().save(request)
        setup_user_email(request, user, [])
        return user
