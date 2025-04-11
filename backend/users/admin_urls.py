from django.urls import path
from .admin_views import (
    AdminDashboardView, AdminCustomerListView, AdminVendorListView,
    AdminVendorDetailView, AdminVendorApproveView
)

urlpatterns = [
    path('dashboard/', AdminDashboardView.as_view(), name='admin_dashboard'),
    path('customers/', AdminCustomerListView.as_view(), name='admin_customers'),
    path('vendors/', AdminVendorListView.as_view(), name='admin_vendors'),
    path('vendors/<int:pk>/', AdminVendorDetailView.as_view(), name='admin_vendor_detail'),
    path('vendors/<int:pk>/approve/', AdminVendorApproveView.as_view(), name='admin_vendor_approve'),
]

