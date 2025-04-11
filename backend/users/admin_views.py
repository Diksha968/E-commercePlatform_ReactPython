from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum, Count
from .models import User, Vendor, Customer
from .serializers import UserSerializer, VendorSerializer, CustomerSerializer
from products.models import Product
from orders.models import Order, OrderItem

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == 'admin'

class AdminDashboardView(APIView):
    permission_classes = [IsAdminUser]
    
    def get(self, request):
        # Get total sales
        total_sales = Order.objects.filter(payment_status='paid').aggregate(Sum('total'))['total__sum'] or 0
        
        # Get total orders
        total_orders = Order.objects.count()
        
        # Get total products
        total_products = Product.objects.count()
        
        # Get total customers
        total_customers = Customer.objects.count()
        
        # Get total vendors
        total_vendors = Vendor.objects.count()
        
        # Get recent orders
        recent_orders = Order.objects.order_by('-created_at')[:5]
        recent_orders_data = []
        for order in recent_orders:
            recent_orders_data.append({
                'id': order.id,
                'order_number': order.order_number,
                'date': order.created_at,
                'status': order.status,
                'amount': order.total,
                'customer': {
                    'id': order.user.id,
                    'name': order.user.name,
                    'email': order.user.email
                }
            })
        
        # Get top selling products
        top_products = Product.objects.annotate(
            units_sold=Sum('orderitem__quantity')
        ).order_by('-units_sold')[:5]
        
        top_products_data = []
        for product in top_products:
            if product.units_sold:
                revenue = OrderItem.objects.filter(
                    product=product, 
                    order__payment_status='paid'
                ).aggregate(Sum('total'))['total__sum'] or 0
                
                top_products_data.append({
                    'id': product.id,
                    'name': product.name,
                    'category': product.category.name if product.category else 'Uncategorized',
                    'price': product.price,
                    'unitsSold': product.units_sold,
                    'revenue': revenue,
                    'vendor': {
                        'id': product.vendor.id,
                        'name': product.vendor.business_name
                    }
                })
        
        # Get sales by month
        from django.db.models.functions import TruncMonth
        sales_by_month = Order.objects.filter(
            payment_status='paid'
        ).annotate(
            month=TruncMonth('created_at')
        ).values('month').annotate(
            total=Sum('total')
        ).order_by('month')
        
        sales_by_month_data = [
            {
                'month': item['month'].strftime('%B %Y'),
                'total': item['total']
            } for item in sales_by_month
        ]
        
        return Response({
            'totalSales': total_sales,
            'totalOrders': total_orders,
            'totalProducts': total_products,
            'totalCustomers': total_customers,
            'totalVendors': total_vendors,
            'recentOrders': recent_orders_data,
            'topProducts': top_products_data,
            'salesByMonth': sales_by_month_data
        })

class AdminCustomerListView(generics.ListAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = CustomerSerializer
    queryset = Customer.objects.all()

class AdminVendorListView(generics.ListAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = VendorSerializer
    queryset = Vendor.objects.all()

class AdminVendorDetailView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = VendorSerializer
    queryset = Vendor.objects.all()

class AdminVendorApproveView(APIView):
    permission_classes = [IsAdminUser]
    
    def post(self, request, pk):
        try:
            vendor = Vendor.objects.get(pk=pk)
            vendor.is_approved = True
            vendor.save()
            return Response({'status': 'Vendor approved successfully'})
        except Vendor.DoesNotExist:
            return Response(
                {'error': 'Vendor not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )

