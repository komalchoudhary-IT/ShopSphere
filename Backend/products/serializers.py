from rest_framework import serializers
from .models import Product,Category

class ProductSerializer(serializers.ModelSerializer):

    vendor = serializers.ReadOnlyField(source="vendor.username")
    image = serializers.ImageField(required=False, allow_null=True, use_url=True)

    class Meta:
        model = Product
        fields = "__all__"

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"