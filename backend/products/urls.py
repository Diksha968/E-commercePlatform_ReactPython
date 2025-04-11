from django.urls import path
from .views import featured_products, categories, products, product_detail

urlpatterns = [
    path('', products, name='products'),
    path('<int:product_id>/', product_detail, name='product_detail'),
    path('featured/', featured_products, name='featured_products'),
    path('categories/', categories, name='categories'),
]

