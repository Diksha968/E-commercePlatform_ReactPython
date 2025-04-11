from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

# Mock data for development
mock_orders = [
    {
        "id": 1,
        "order_number": "ORD12345",
        "user": {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com"
        },
        "shipping_address_details": {
            "address_line1": "123 Main St",
            "address_line2": "Apt 4B",
            "city": "Pune",
            "state": "Maharashtra",
            "postal_code": "411001",
            "country": "India"
        },
        "billing_address_details": {
            "address_line1": "123 Main St",
            "address_line2": "Apt 4B",
            "city": "Pune",
            "state": "Maharashtra",
            "postal_code": "411001",
            "country": "India"
        },
        "status": "delivered",
        "payment_status": "paid",
        "payment_method": "card",
        "subtotal": 650,
        "shipping_cost": 0,
        "tax": 117,
        "discount": 0,
        "total": 767,
        "created_at": "2023-06-15T10:30:00Z",
        "items": [
            {
                "id": 1,
                "product": 1,
                "product_details": {
                    "id": 1,
                    "name": "Organic Turmeric Powder",
                    "image": "/placeholder.svg?height=100&width=100"
                },
                "vendor": 1,
                "quantity": 2,
                "price": 150,
                "total": 300
            },
            {
                "id": 2,
                "product": 3,
                "product_details": {
                    "id": 3,
                    "name": "Herbal Tea",
                    "image": "/placeholder.svg?height=100&width=100"
                },
                "vendor": 3,
                "quantity": 1,
                "price": 200,
                "total": 200
            },
            {
                "id": 3,
                "product": 4,
                "product_details": {
                    "id": 4,
                    "name": "Fresh Cookies",
                    "image": "/placeholder.svg?height=100&width=100"
                },
                "vendor": 4,
                "quantity": 1,
                "price": 150,
                "total": 150
            }
        ]
    }
]

@api_view(['GET'])
@permission_classes([AllowAny])
def orders(request):
    return JsonResponse(mock_orders, safe=False)

@api_view(['GET'])
@permission_classes([AllowAny])
def order_detail(request, order_id):
    order = next((o for o in mock_orders if o['id'] == order_id), None)
    if order:
        return JsonResponse(order)
    return JsonResponse({"error": "Order not found"}, status=404)

