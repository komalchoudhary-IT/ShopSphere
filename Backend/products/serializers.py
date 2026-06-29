from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):

    vendor = serializers.ReadOnlyField(source="vendor.username")

    class Meta:
        model = Product
        fields = "__all__"