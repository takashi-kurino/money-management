from django.contrib.auth.models import AbstractUser
# カスタムユーザーモデル
class CustomUser(AbstractUser):
    
    class Meta:
        verbose_name = 'ユーザー'
        verbose_name_plural = 'ユーザー'
    pass

    def __str__(self):
        return self.username