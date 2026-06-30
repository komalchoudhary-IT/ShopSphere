from rest_framework import serializers
from .models import Vendors,Order

class VendorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendors
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'