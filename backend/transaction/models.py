from django.db import models
import uuid

from users.models import CustomUser
# Create your models here.


class Category(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='categories', null=True, blank=True)
    name = models.CharField(max_length=255)
    class Meta:
        unique_together = ('name', 'user')

    def __str__(self):
        return self.name
    
    @property
    def is_default(self):
        return self.user is None

class Transaction(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='transactions')
    type = models.CharField(max_length=10, choices=[('収入', '収入'), ('支出', '支出')])
    store = models.CharField(max_length=255, null=True, blank=True)
    total_price = models.DecimalField(max_digits=10,decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.created_at} - {self.type} - {self.store} - {self.total_price}"
    
class Item(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    transaction = models.ForeignKey(Transaction, on_delete=models.CASCADE, related_name='items')
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    amount = models.DecimalField(max_digits=10,decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        transaction = self.transaction
        return f"{transaction.type} - 商品名: {self.name} - 価格: {self.price} - 個数: {self.amount} - カテゴリ: {self.category.name if self.category else 'No Category'}"

    