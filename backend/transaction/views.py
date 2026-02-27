from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Transaction, Category, Item
from .serializer import TransactionSerializer, CategorySerializer, ItemSerializer
from django.db.models import Q

class TransactionViewSet(viewsets.ModelViewSet):
    
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    
    def get_serializer_class(self):
        if self.action == 'list':
            from .serializer import TransactionListSerializer
            return TransactionListSerializer
        return TransactionSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # デフォルトカテゴリ（user=None）+ ユーザー自身のカテゴリを返す
        return Category.objects.filter(
            Q(user=None) | Q(user=self.request.user)
        )
    
    def perform_create(self, serializer):
        # 新規作成時に自動的にユーザーを設定
        serializer.save(user=self.request.user)

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        transaction_pk = self.kwargs.get('transaction_pk')
        if transaction_pk is not None:
            return qs.filter(transaction__uuid=transaction_pk)
        return qs

    def perform_create(self, serializer):
        transaction_pk = self.kwargs.get('transaction_pk')
        transaction = Transaction.objects.get(uuid=transaction_pk)
        serializer.save(transaction=transaction)
        # total_price update in TransactionSerializer.create handles when
        # items are provided during transaction creation, but when items are
        # created separately we can recalc here as well:
        total = sum(item.price * item.amount for item in transaction.items.all())
        transaction.total_price = total
        transaction.save()