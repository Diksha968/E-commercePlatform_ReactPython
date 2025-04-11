from django.urls import path
from .views import RegisterView, LoginView, UserProfileView, AddressListCreateView, AddressDetailView, VendorProfileView, CustomerProfileView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('me/', UserProfileView.as_view(), name='user_profile'),
    path('addresses/', AddressListCreateView.as_view(), name='address_list'),
    path('addresses/<int:pk>/', AddressDetailView.as_view(), name='address_detail'),
    path('vendor-profile/', VendorProfileView.as_view(), name='vendor_profile'),
    path('customer-profile/', CustomerProfileView.as_view(), name='customer_profile'),
]

