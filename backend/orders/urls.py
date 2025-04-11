from django.urls import path
from .views import orders, order_detail

urlpatterns = [
    path('', orders, name='orders'),
    path('<int:order_id>/', order_detail, name='order_detail'),
]

