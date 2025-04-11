from rest_framework import serializers
from .models import Order, OrderItem, Payment
from users.serializers import AddressSerializer
from products.serializers import ProductSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    product_details = serializers.SerializerMethodField()
    
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_details', 'vendor', 'quantity', 'price', 'total']
        read_only_fields = ['id', 'product_details', 'vendor', 'total']
    
    def get_product_details(self, obj):
        return {
            'id': obj.product.id,
            'name': obj.product.name,
            'image': obj.product.images.filter(is_primary=True).first().image.url if obj.product.images.filter(is_primary=True).exists() else None
        }

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    shipping_address_details = serializers.SerializerMethodField()
    billing_address_details = serializers.SerializerMethodField()
    
    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'user', 'shipping_address', 'shipping_address_details',
            'billing_address', 'billing_address_details', 'status', 'payment_status',
            'payment_method', 'subtotal', 'shipping_cost', 'tax', 'discount', 'total',
            'notes', 'tracking_number', 'created_at', 'items'
        ]
        read_only_fields = ['id', 'order_number', 'user', 'created_at', 'shipping_address_details', 'billing_address_details']
    
    def get_shipping_address_details(self, obj):
        if obj.shipping_address:
            return AddressSerializer(obj.shipping_address).data
        return None
    
    def get_billing_address_details(self, obj):
        if obj.billing_address:
            return AddressSerializer(obj.billing_address).data
        return None

class OrderCreateSerializer(serializers.ModelSerializer):
    items = serializers.ListField(
        child=serializers.DictField(),
        write_only=True
    )
    
    class Meta:
        model = Order
        fields = [
            'shipping_address', 'billing_address', 'payment_method',
            'notes', 'items'
        ]
    
    def create(self, validated_data):
        items_data = validated_data.pop('items')
        user = self.context['request'].user
        
        # Calculate order totals
        subtotal = sum(item['price'] * item['quantity'] for item in items_data)
        shipping_cost = 0  # Could be calculated based on location, weight, etc.
        tax = subtotal * 0.18  # 18% GST
        total = subtotal + shipping_cost + tax
        
        # Generate order number
        import random
        import string
        order_number = ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))
        
        # Create order
        order = Order.objects.create(
            user=user,
            order_number=order_number,
            subtotal=subtotal,
            shipping_cost=shipping_cost,
            tax=tax,
            total=total,
            **validated_data
        )
        
        # Create order items
        for item_data in items_data:
            product_id = item_data['product']
            quantity = item_data['quantity']
            price = item_data['price']
            
            from products.models import Product
            product = Product.objects.get(id=product_id)
            
            OrderItem.objects.create(
                order=order,
                product=product,
                vendor=product.vendor,
                quantity=quantity,
                price=price,
                total=price * quantity
            )
            
            # Update product quantity
            product.quantity -= quantity
            product.save()
        
        return order

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'order', 'payment_id', 'amount', 'status', 'payment_method', 'created_at']
        read_only_fields = ['id', 'created_at']

