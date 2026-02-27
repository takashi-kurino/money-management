# urls.py
from django.urls import path
from .views import CustomUserListAPIView,CustomUserDeleteView

urlpatterns = [
    path("users/", CustomUserListAPIView.as_view()),  
    path('users/delete/', CustomUserDeleteView.as_view(), name='delete-account'),  # ユーザーのコメント削除
    
]