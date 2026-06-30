from rest_framework import serializers
from .models import CartItem

class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source="product.name")
    product_price = serializers.ReadOnlyField(source="product.price")
    product_image = serializers.ReadOnlyField(source="product.image.url")

    class Meta:
        model = CartItem
        fields = [
            "id",
            "product",
            "product_name",
            "product_price",
            "product_image",
            "quantity",
        ]

    product_image = serializers.SerializerMethodField()

    def get_product_image(self, obj):
      request = self.context.get("request")
      if obj.product.image:
        return request.build_absolute_uri(obj.product.image.url)
      return None