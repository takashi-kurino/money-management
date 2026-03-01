# https://www.django-rest-framework.org/api-guide/routers/#drf-nested-routers
# https://github.com/alanjds/drf-nested-routers?tab=readme-ov-file#drf-nested-routers


from django.urls import path, include
from rest_framework_nested import routers

from .views import CategoryViewSet, TransactionViewSet, ItemViewSet, WeeklyTransactionViewSet

router = routers.SimpleRouter()
router.register(r'transactions', TransactionViewSet)

transation_router = routers.NestedSimpleRouter(router,r'transactions', lookup='transaction')
transation_router.register(r'items', ItemViewSet, basename='transaction-items')

router.register(r'categories', CategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('', include(transation_router.urls)),
    path('weekly/', WeeklyTransactionViewSet.as_view({'get': 'get'}), name='weekly-transactions'),
]