from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from cart.models import Cart, CartItem
from .models import Order, OrderItem
from .serializers import OrderSerializer


class PlaceOrderView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        try:
            cart = Cart.objects.get(user=request.user)
        except Cart.DoesNotExist:
            return Response({"error": "Cart is empty"}, status=400)

        cart_items = CartItem.objects.filter(cart=cart)

        if not cart_items.exists():
            return Response({"error": "Cart is empty"}, status=400)

        order = Order.objects.create(customer=request.user)

        total = 0

        for item in cart_items:
            item_total = item.product.price * item.quantity
            total += item_total

            OrderItem.objects.create(
                order=order,
                product=item.product,
                vendor=item.product.vendor,
                quantity=item.quantity,
                price=item.product.price
            )

        order.total_price = total
        order.save()

        cart_items.delete()  # clear cart after order

        serializer = OrderSerializer(order)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class MyOrdersView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(customer=request.user).order_by("-created_at")
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
    

class VendorOrdersView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        order_items = OrderItem.objects.filter(vendor=request.user)

        data = []
        for item in order_items:
            data.append({
                "order_id": item.order.id,
                "product": item.product.name,
                "quantity": item.quantity,
                "price": item.price,
                "status": item.order.status,
                "customer": item.order.customer.username,
            })

        return Response(data)
    

class UpdateOrderStatusView(APIView):

    permission_classes = [IsAuthenticated]

    def put(self, request, pk):

        try:
            order = Order.objects.get(id=pk)
        except Order.DoesNotExist:
            return Response({"error": "Order not found"}, status=404)

        status_value = request.data.get("status")
        order.status = status_value
        order.save()

        return Response({"message": "Order status updated"})