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
    
    def create(self, validated_data):
        items_data = validated_data.pop('items', [])
        transaction = Transaction.objects.create(**validated_data)
        
        # Items をまとめて作成
        for item_data in items_data:
            Item.objects.create(transaction=transaction, **item_data)
        
        # total_price を計算
        total = sum(
            item.price * item.amount 
            for item in transaction.items.all()
        )
        transaction.total_price = total
        transaction.save()
        
        return transaction


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
