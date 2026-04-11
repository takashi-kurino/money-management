from .models import Transaction, Category, Item
from rest_framework import serializers

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['uuid', 'name']

class ItemSerializer(serializers.ModelSerializer):
    uuid = serializers.UUIDField(read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Item
        fields = ['uuid', 'name', 'price', 'amount', 'category', 'category_name']

class TransactionSerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True, read_only=False, required=False)

    class Meta:
        model = Transaction
        fields = ['uuid', 'type', 'store', 'total_price', 'created_at', 'updated_at', 'items']

    def _recalculate_total(self, transaction):
        """削除された後の残ったitemで合計を再計算する"""
        total = sum(item.price * item.amount for item in transaction.items.all())
        transaction.total_price = total
        transaction.save()

    def _save_items(self, transaction, items_data):
        """Items の保存と total_price の再計算（create/update 共通）"""
        if not items_data:
            return
        for item_data in items_data:
            Item.objects.create(transaction=transaction, **item_data)

        total = sum(item.price * item.amount for item in transaction.items.all())
        transaction.total_price = total
        print("Total price calculated:", total, flush=True)  # デバッグ用ログ
        transaction.save()

    def create(self, validated_data):
        print("Creating Transaction with data:", validated_data, flush=True)  # デバッグ用ログ
        items_data = validated_data.pop('items', [])
        transaction = Transaction.objects.create(**validated_data)
        self._save_items(transaction, items_data)
        print("Transaction created:", transaction, flush=True)  # デバッグ用ログ
        return transaction

    def update(self, instance, validated_data):
        print("Updating Transaction with data:", validated_data, flush=True)  # デバッグ用ログ
        items_data = validated_data.pop('items', None)

        # Transaction フィールドの更新
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Items が送られてきた場合のみ再構築
        if items_data is not None:
            instance.items.all().delete()  # 既存を全削除
            self._save_items(instance, items_data)

        return instance
    
class TransactionListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transaction
        fields = ['uuid', 'type', 'store', 'total_price', 'created_at', 'updated_at']

class WeeklyTransactionSerializer(serializers.Serializer):
    week_start = serializers.DateField()
    week_end = serializers.DateField()
    total_income = serializers.DecimalField(max_digits=10, decimal_places=2)
    total_expense = serializers.DecimalField(max_digits=10, decimal_places=2)
    transactions = TransactionListSerializer(many=True)
