from rest_framework import serializers
from .models import Category, Product, ProductImage, ProductVariant, Review
from users.serializers import VendorSerializer

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'image', 'parent', 'is_active']
        read_only_fields = ['id']

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'alt_text', 'is_primary']
        read_only_fields = ['id']

class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = ['id', 'name', 'value']
        read_only_fields = ['id']

class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Review
        fields = ['id', 'user', 'user_name', 'rating', 'comment', 'created_at']
        read_only_fields = ['id', 'user', 'user_name', 'created_at']
    
    def get_user_name(self, obj):
        return obj.user.name

class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.SerializerMethodField()
    vendor_details = serializers.SerializerMethodField()
    images = ProductImageSerializer(many=True, read_only=True)
    variants = ProductVariantSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    average_rating = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = [
            'id', 'vendor', 'vendor_details', 'category', 'category_name', 
            'name', 'slug', 'description', 'price', 'compare_price', 
            'sku', 'quantity', 'is_featured', 'is_active', 'created_at',
            'images', 'variants', 'reviews', 'average_rating', 'discount_percentage'
        ]
        read_only_fields = ['id', 'created_at', 'vendor_details', 'category_name', 'average_rating', 'discount_percentage']
    
    def get_category_name(self, obj):
        return obj.category.name if obj.category else None
    
    def get_vendor_details(self, obj):
        return {
            'id': obj.vendor.id,
            'name': obj.vendor.business_name,
            'logo': obj.vendor.logo.url if obj.vendor.logo else None
        }
    
    def get_average_rating(self, obj):
        reviews = obj.reviews.all()
        if reviews:
            return sum(review.rating for review in reviews) / len(reviews)
        return 0

class ProductCreateUpdateSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, required=False)
    variants = ProductVariantSerializer(many=True, required=False)
    
    class Meta:
        model = Product
        fields = [
            'category', 'name', 'description', 'price', 'compare_price', 
            'cost_price', 'sku', 'quantity', 'is_featured', 'is_active',
            'images', 'variants'
        ]
    
    def create(self, validated_data):
        images_data = validated_data.pop('images', [])
        variants_data = validated_data.pop('variants', [])
        
        # Get the vendor from the current user
        vendor = self.context['request'].user.vendor_profile
        
        # Create the product
        product = Product.objects.create(vendor=vendor, **validated_data)
        
        # Create product images
        for image_data in images_data:
            ProductImage.objects.create(product=product, **image_data)
        
        # Create product variants
        for variant_data in variants_data:
            ProductVariant.objects.create(product=product, **variant_data)
        
        return product
    
    def update(self, instance, validated_data):
        images_data = validated_data.pop('images', None)
        variants_data = validated_data.pop('variants', None)
        
        # Update the product fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # Update images if provided
        if images_data is not None:
            instance.images.all().delete()
            for image_data in images_data:
                ProductImage.objects.create(product=instance, **image_data)
        
        # Update variants if provided
        if variants_data is not None:
            instance.variants.all().delete()
            for variant_data in variants_data:
                ProductVariant.objects.create(product=instance, **variant_data)
        
        return instance

