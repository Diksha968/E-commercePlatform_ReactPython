from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

# Mock data for development
mock_categories = [
    {"id": 1, "name": "Food Products", "slug": "food", "description": "Fresh and packaged food items", "image": "/placeholder.svg?height=200&width=200"},
    {"id": 2, "name": "Bakery Items", "slug": "bakery", "description": "Fresh baked goods", "image": "/placeholder.svg?height=200&width=200"},
    {"id": 3, "name": "Spices", "slug": "spices", "description": "Organic spices and seasonings", "image": "/placeholder.svg?height=200&width=200"},
    {"id": 4, "name": "Herbal Products", "slug": "herbal", "description": "Natural herbal remedies", "image": "/placeholder.svg?height=200&width=200"},
    {"id": 5, "name": "Cleaning Solutions", "slug": "cleaning", "description": "Eco-friendly cleaning products", "image": "/placeholder.svg?height=200&width=200"},
]

mock_products = [
    {
        "id": 1,
        "name": "Organic Turmeric Powder",
        "slug": "organic-turmeric-powder",
        "description": "100% organic turmeric powder, freshly ground and packed.",
        "price": 150,
        "compare_price": 180,
        "quantity": 100,
        "is_featured": True,
        "is_active": True,
        "category": 3,
        "category_name": "Spices",
        "vendor": 1,
        "vendor_details": {
            "id": 1,
            "name": "Spice World",
            "logo": "/placeholder.svg?height=100&width=100"
        },
        "images": [
            {"id": 1, "image": "/placeholder.svg?height=400&width=400", "alt_text": "Turmeric Powder", "is_primary": True}
        ],
        "reviews": [],
        "average_rating": 4.5,
        "discount_percentage": 17
    },
    {
        "id": 2,
        "name": "Whole Wheat Flour",
        "slug": "whole-wheat-flour",
        "description": "Stone-ground whole wheat flour, perfect for making chapatis and breads.",
        "price": 120,
        "compare_price": 140,
        "quantity": 50,
        "is_featured": True,
        "is_active": True,
        "category": 1,
        "category_name": "Food Products",
        "vendor": 2,
        "vendor_details": {
            "id": 2,
            "name": "Organic Farms",
            "logo": "/placeholder.svg?height=100&width=100"
        },
        "images": [
            {"id": 2, "image": "/placeholder.svg?height=400&width=400", "alt_text": "Whole Wheat Flour", "is_primary": True}
        ],
        "reviews": [],
        "average_rating": 4.2,
        "discount_percentage": 14
    },
    {
        "id": 3,
        "name": "Herbal Tea",
        "slug": "herbal-tea",
        "description": "A blend of medicinal herbs that helps boost immunity and improve digestion.",
        "price": 200,
        "compare_price": 250,
        "quantity": 30,
        "is_featured": True,
        "is_active": True,
        "category": 4,
        "category_name": "Herbal Products",
        "vendor": 3,
        "vendor_details": {
            "id": 3,
            "name": "Herbal Life",
            "logo": "/placeholder.svg?height=100&width=100"
        },
        "images": [
            {"id": 3, "image": "/placeholder.svg?height=400&width=400", "alt_text": "Herbal Tea", "is_primary": True}
        ],
        "reviews": [],
        "average_rating": 4.8,
        "discount_percentage": 20
    },
    {
        "id": 4,
        "name": "Fresh Cookies",
        "slug": "fresh-cookies",
        "description": "Freshly baked cookies made with whole wheat flour and jaggery.",
        "price": 180,
        "compare_price": 200,
        "quantity": 20,
        "is_featured": True,
        "is_active": True,
        "category": 2,
        "category_name": "Bakery Items",
        "vendor": 4,
        "vendor_details": {
            "id": 4,
            "name": "Happy Bakery",
            "logo": "/placeholder.svg?height=100&width=100"
        },
        "images": [
            {"id": 4, "image": "/placeholder.svg?height=400&width=400", "alt_text": "Fresh Cookies", "is_primary": True}
        ],
        "reviews": [],
        "average_rating": 4.6,
        "discount_percentage": 10
    },
    {
        "id": 5,
        "name": "Natural Floor Cleaner",
        "slug": "natural-floor-cleaner",
        "description": "Eco-friendly floor cleaner made with natural ingredients.",
        "price": 250,
        "compare_price": 300,
        "quantity": 40,
        "is_featured": False,
        "is_active": True,
        "category": 5,
        "category_name": "Cleaning Solutions",
        "vendor": 5,
        "vendor_details": {
            "id": 5,
            "name": "Eco Clean",
            "logo": "/placeholder.svg?height=100&width=100"
        },
        "images": [
            {"id": 5, "image": "/placeholder.svg?height=400&width=400", "alt_text": "Natural Floor Cleaner", "is_primary": True}
        ],
        "reviews": [],
        "average_rating": 4.3,
        "discount_percentage": 17
    },
    {
        "id": 6,
        "name": "Organic Honey",
        "slug": "organic-honey",
        "description": "Pure organic honey collected from forest beehives.",
        "price": 350,
        "compare_price": 400,
        "quantity": 25,
        "is_featured": False,
        "is_active": True,
        "category": 1,
        "category_name": "Food Products",
        "vendor": 2,
        "vendor_details": {
            "id": 2,
            "name": "Organic Farms",
            "logo": "/placeholder.svg?height=100&width=100"
        },
        "images": [
            {"id": 6, "image": "/placeholder.svg?height=400&width=400", "alt_text": "Organic Honey", "is_primary": True}
        ],
        "reviews": [],
        "average_rating": 4.9,
        "discount_percentage": 13
    }
]

@api_view(['GET'])
@permission_classes([AllowAny])
def featured_products(request):
    featured = [p for p in mock_products if p.get('is_featured', False)]
    return JsonResponse(featured, safe=False)

@api_view(['GET'])
@permission_classes([AllowAny])
def categories(request):
    return JsonResponse(mock_categories, safe=False)

@api_view(['GET'])
@permission_classes([AllowAny])
def products(request):
    # Filter by category if provided
    category = request.GET.get('category')
    if category:
        filtered_products = [p for p in mock_products if p.get('category_name', '').lower() == category.lower()]
    else:
        filtered_products = mock_products
    
    return JsonResponse(filtered_products, safe=False)

@api_view(['GET'])
@permission_classes([AllowAny])
def product_detail(request, product_id):
    product = next((p for p in mock_products if p['id'] == product_id), None)
    if product:
        return JsonResponse(product)
    return JsonResponse({"error": "Product not found"}, status=404)

