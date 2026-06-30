from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import RetrieveAPIView
from django.db.models import Sum, Count
from orders.models import OrderItem

from .models import *
from .serializers import *
# Create your views here.

class AddProductView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        if request.user.role != "vendor":
            return Response(
                {
                    "error": "Only vendors can add products."
                },
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = ProductSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(vendor=request.user)

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    
class MyProductsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        products = Product.objects.filter(vendor=request.user)
        serializer = ProductSerializer(products, many=True, context={"request": request})
        return Response(serializer.data)
    

class UpdateProductView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response(
                {"error": "Product not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        if product.vendor != request.user:
            return Response(
                {"error": "Permission denied"},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = ProductSerializer(
            product,
            data=request.data,
            partial=True,
            context={"request": request}
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    

class DeleteProductView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response(
                {"error": "Product not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        if product.vendor != request.user:
            return Response(
                {"error": "Permission denied"},
                status=status.HTTP_403_FORBIDDEN
            )

        product.delete()

        return Response(
            {"message": "Product deleted successfully"},
            status=status.HTTP_200_OK
        )
    

class ProductListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        products = Product.objects.all().order_by("-created_at")
        serializer = ProductSerializer(products, many=True,context={"request": request})
        return Response(serializer.data)
    

@api_view(["GET"])
def get_products(request):
    category = request.GET.get("category")  # 👈 query param

    if category and category != "all":
        products = Product.objects.filter(category__name__iexact=category)
        print("CATEGORY:", category)
        print("PRODUCTS:", products)
    else:
        products = Product.objects.all()

    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def get_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


class ProductDetailView(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]



class VendorDashboardView(APIView):
      permission_classes = [IsAuthenticated]

      def get(self, request):

        products = Product.objects.filter(vendor=request.user)

        total_products = products.count()

        order_items = OrderItem.objects.filter(
            product__vendor=request.user
        )

        total_orders = order_items.values("order").distinct().count()

        total_sales = order_items.aggregate(
            total=Sum("quantity")
        )["total"] or 0

        total_revenue = sum(
            item.quantity * item.product.price
            for item in order_items
        )

        return Response({
            "total_products": total_products,
            "total_orders": total_orders,
            "total_sales": total_sales,
            "total_revenue": total_revenue,
        })