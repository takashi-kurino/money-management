from rest_framework import serializers
from .models import CustomUser 
from django.contrib.auth import get_user_model

User = get_user_model()

class CustomUserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email']  # 必要に応じて調整

class CustomUserDeleteSerializer(serializers.Serializer):
    password = serializers.CharField(write_only=True)
    
    def validate_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("パスワードが正しくありません。")
        return value

    def validate(self, attrs):
        return super().validate(attrs)
