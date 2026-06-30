from django.shortcuts import render,redirect
from .models import Category,Products,Vendors,Customer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import VendorsSerializer
from django.http import JsonResponse
from rest_framework import viewsets
from .models import Order
from .serializers import OrderSerializer
from django.http import JsonResponse
from .models import Order, Customer, Products  

from django.contrib.auth.models import User
from django.contrib.auth import authenticate

# Create your views here.
def dashboard (request):
   return render(request,"dashboard.html")


@api_view(['GET'])
def dashboard(request):

    data = {
        "vendors": Vendors.objects.count(),
        "products": Products.objects.count(),
        "categories": Category.objects.count(),
    }

    return Response(data)

def categories(request):
    
    if request.method == "POST":
       name=request.POST.get("name") 
       Category.objects.create(name=name)
       return redirect('categories')
           
    categories = Category.objects.all()
    return render(request,"categories.html",{'categories':categories})


def delete_category(request, id):
    category = Category.objects.get(id=id)
    category.delete()
    return redirect('categories')
 
def products(request):

    if request.method == "POST":
        name = request.POST.get("name")
        price = request.POST.get("price")
        stock = request.POST.get("stock")
        category_id = request.POST.get("category")

        category = Category.objects.get(id=category_id)

        Products.objects.create(
            name=name,
            price=price,
            stock=stock,
            category=category
        )

        return redirect('products')

    products = Products.objects.all()
    categories = Category.objects.all()

    return render(
        request,
        "products.html",
        {
            "products": products,
            "categories": categories
        }
    )
def delete_product(request, id):
    product = Products.objects.get(id=id)
    product.delete()
    return redirect('products')

def edit_product(request, id):
    product = Products.objects.get(id=id)

    if request.method == "POST":
        product.name = request.POST.get("name")
        product.price = request.POST.get("price")
        product.stock = request.POST.get("stock")
        product.save()

        return redirect('products')

    return render(request, "edit_product.html", {"product": product})


def vendors(request):
    vendors = Vendors.objects.all()
    return render(
        request,
        "vendors.html",
        {"vendors": vendors}
    )
def approve_vendor(request, id):
    vendor = Vendors.objects.get(id=id)
    vendor.status = "Approved"
    vendor.save()

    return redirect('vendors')    
def delete_vendor(request, id):
    vendor = Vendors.objects.get(id=id)
    vendor.status = "Deleted"
    vendor.save()

    return redirect('vendors')

@api_view(['GET','POST'])
def vendors(request):

    if request.method == "GET":
        vendors = Vendors.objects.all()
        serializer = VendorsSerializer(vendors, many=True)
        return Response(serializer.data)

    serializer = VendorsSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors)

@api_view(['DELETE'])
def delete_vendor(request,id):

    vendor = Vendors.objects.get(id=id)
    vendor.delete()

    return Response({"message":"Vendor Deleted"})

@api_view(['PUT'])
def approve_vendor(request,id):

    vendor = Vendors.objects.get(id=id)

    vendor.status = "Approved"
    vendor.save()

    return Response({"message":"Vendor Approved"})

from django.http import JsonResponse
from .models import Customer

def customer_list(request):
    customers = Customer.objects.all()

    data = []

    for c in customers:
        data.append({
            "id": c.id,
            "name": c.name,
            "email": c.email,
            "phone": c.phone
        })

    return JsonResponse(data, safe=False)

from django.shortcuts import get_object_or_404
from django.http import JsonResponse

def delete_customer(request, id):
    customer = get_object_or_404(Customer, id=id)
    customer.delete()

    return JsonResponse({
        "success": True,
        "message": "Customer Deleted"
    })
    


def reports(request):
    return JsonResponse({
        "categories": Category.objects.count(),
        "products": Products.objects.count(),
        "vendors": Vendors.objects.count(),
        "customers": Customer.objects.count(),
    })
  

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    
    from django.http import JsonResponse
from .models import Order, Customer, Products  # apne models adjust karna

def reports_api(request):
    data = {
        "total_orders": Order.objects.count(),
        "total_customers": Customer.objects.count(),
        "total_products": Products.objects.count(),
    }
    return JsonResponse(data)


@api_view(['POST'])
def change_password(request):
    username = request.data.get("username")
    old_password = request.data.get("old_password")
    new_password = request.data.get("new_password")

    user = authenticate(username=username, password=old_password)

    if user is not None:
        user.set_password(new_password)
        user.save()
        return Response({"message": "Password changed successfully"})
    
    return Response({"message": "Invalid credentials"}, status=400)


def profile(request):
    data = {
        "name": "Admin User",
        "email": "admin@shopsphere.com",
        "role": "Administrator",
        "phone": "+91 9876543210"
    }
    
    
