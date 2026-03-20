from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Transaction, Category, Item
from .serializer import TransactionSerializer, CategorySerializer, ItemSerializer, TransactionListSerializer, WeeklyTransactionSerializer
from django.db.models import Q
from django.db.models import Sum
from datetime import date
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

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

class WeeklyTransactionView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            year = int(request.query_params.get('year'))
            week = int(request.query_params.get('week'))
        except (TypeError, ValueError):
            return Response({"error": "year and week are required"}, status=status.HTTP_400_BAD_REQUEST)

        monday = date.fromisocalendar(year, week, 1)
        sunday = date.fromisocalendar(year, week, 7)

        transactions = Transaction.objects.filter(
            user=request.user,
            created_at__date__range=[monday, sunday]
        ).prefetch_related('items__category')  # N+1対策

        total_income = transactions.filter(type='収入').aggregate(
            Sum('total_price'))['total_price__sum'] or 0
        total_expense = transactions.filter(type='支出').aggregate(
            Sum('total_price'))['total_price__sum'] or 0

        data = {
            "week_start": monday,
            "week_end": sunday,
            "total_income": total_income,
            "total_expense": total_expense,
            "transactions": transactions,
        }

        serializer = WeeklyTransactionSerializer(data)
        return Response(serializer.data)