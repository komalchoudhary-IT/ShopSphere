from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

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
        products = Product.objects.filter(category__name=category)
    else:
        products = Product.objects.all()

    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def get_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)