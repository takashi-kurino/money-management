from .models import Transaction, Category, Item
from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator

class CategoryCreateSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    
    class Meta:
        model = Category
        fields = ['uuid', 'name', 'user']

    @property
    def validators(self):
        
        return [UniqueTogetherValidator(
            queryset=Category.objects.all().filter(user=self.context['request'].user),
            fields=['name', 'user'],
            message="このカテゴリーは既に存在しています。"
        )]

class CategoryReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['uuid', 'name']
    
class ItemSerializer(serializers.ModelSerializer):
    uuid = serializers.UUIDField(read_only=True)

    class Meta:
        model = Item
        fields = ['uuid', 'name', 'price', 'amount', 'category']

class TransactionDetailSerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True, read_only=False, required=False)       

    class Meta:
        model = Transaction
        fields = ['uuid', 'date', 'type', 'store', 'category', 'total_price', 'created_at', 'updated_at', 'items']

    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        # GETのレスポンス時だけcategoryを詳細オブジェクトに差し替える
        if instance.category:
            data['category'] = CategoryReadSerializer(instance.category).data
        return data

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

        transaction.save()

    def create(self, validated_data):

        items_data = validated_data.pop('items', [])
        transaction = Transaction.objects.create(**validated_data)
        self._save_items(transaction, items_data)

        return transaction

    def update(self, instance, validated_data):

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
        fields = ['uuid', 'date', 'type', 'store', 'category', 'total_price', 'created_at', 'updated_at']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        # GETのレスポンス時だけcategoryを詳細オブジェクトに差し替える
        if instance.category:
            data['category'] = CategoryReadSerializer(instance.category).data
        return data

class WeeklyTransactionSerializer(serializers.Serializer):
    week_start = serializers.DateField()
    week_end = serializers.DateField()
    total_income = serializers.DecimalField(max_digits=10, decimal_places=2)
    total_expense = serializers.DecimalField(max_digits=10, decimal_places=2)
    transactions = TransactionListSerializer(many=True)
