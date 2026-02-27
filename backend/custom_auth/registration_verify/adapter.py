# registration_verify/adapter.py
from allauth.account.adapter import DefaultAccountAdapter
import os

NEXT_PUBLIC_URL = os.getenv('NEXT_PUBLIC_URL')

class CustomAccountAdapter(DefaultAccountAdapter):
    def get_email_confirmation_url(self, request, emailconfirmation):
        # デフォルトはバックエンドURLになるのでここでフロントのURLを返す
        return f"{NEXT_PUBLIC_URL}/registration/verify-email/?key={emailconfirmation.key}"
