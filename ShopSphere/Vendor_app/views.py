from django.shortcuts import render , redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate ,logout,login
from django.contrib.auth.decorators import login_required
from .models import Vendor ,Product ,ProductImage

# Create your views here.
def home(request):
    return render(request,"Vendor_data/Vendor_home.html")

def register(request):
    if request.method == "POST":
        fullname=request.POST.get("full_name")
        username=request.POST.get("username")
        email=request.POST.get("email")
        password=request.POST.get("password")
        phone=request.POST.get("phone")
        shop_name=request.POST.get("shop_name")
        business_type=request.POST.get("business_type")
        shop_description=request.POST.get("description")
        gst_number=request.POST.get("gst_number")
        address=request.POST.get("address")
        logo=request.FILES.get('vendor_logos/')
        user = User.objects.create_user(
            first_name=fullname,
            username=username,
            email=email,
            password=password
        )

        Vendor.objects.create(
            user=user,
            phone=phone,
            shop_name=shop_name,
            business_type=business_type,
            shop_description=shop_description,
            gst_number=gst_number,
            address=address,
            shop_logo=logo,
        )
        return render(request,"Vendor_data/Login.html")
    
    elif request.user.is_authenticated:
        return redirect("profile")
    
    return render(request, 'Vendor_data/Register.html')
    
 
def login_user(request):
    if request.method== "POST":
        login_value = request.POST.get("login_value")
        password = request.POST.get("password")

        try:

            if "@" in login_value:

                user_obj = User.objects.get(email=login_value)
                username = user_obj.username

            else:

                username = login_value

            user = authenticate(
                request,
                username=username,
                password=password
            )

            if user is not None:

                login(request, user)

                return redirect("profile")

        except User.DoesNotExist:

            pass
    
    elif request.user.is_authenticated:
        return redirect("profile")
    
    return render(
        request,
        "Vendor_data/Login.html")


def profile(request):
    if request.method == "POST":
        email=request.POST.get("email")
        useraname=request.POST.get("username")
        password=request.POST.get("password")
        user=authenticate(
            request,
            useraname=useraname,
            email=email,
            password=password
        )
        if (user!= None):
            login(request,user)
            return render(request,'Vendor_data/Profile.html',{"user" : request.user})
        else:
            return render(request,'Vendor_data/Login.html',{"error" : "Invalid Credentials"})
    
    elif request.user.is_authenticated:
        return redirect("profile")
    
    return render(request,'Vendor_data/Login.html')

@login_required(login_url='login_user')
def profile(request):
    return render(request,'Vendor_data/Profile.html',{"user" : request.user})


@login_required(login_url='vendor_login')
def update_vendor_profile(request):

    vendor = request.user.vendor

    if request.method == "POST":

        vendor.shop_name = request.POST.get(
            "shop_name"
        )

        vendor.phone = request.POST.get(
            "phone"
        )

        vendor.gst_number = request.POST.get(
            "gst_number"
        )

        vendor.address = request.POST.get(
            "address"
        )

        vendor.shop_description = request.POST.get(
            "shop_description"
        )

        logo = request.FILES.get(
            "shop_logo"
        )

        if logo:
            vendor.shop_logo = logo

        vendor.save()

        return redirect(
            "profile"
        )

    return render(
        request,
        "Vendor_data/update_profile.html",
        {
            "vendor": vendor
        }
    )
    

@login_required(login_url='login_user')
def dashboard(request):
    return render(request,'Vendor_data/Dashboard.html',{"user" : request.user})

@login_required
def update_details(request):
    new_name=request.POST.get("fullname")
    new_username=request.POST.get("username")
    new_email=request.POST.get("email")

    request.user.first_name=new_name
    request.user.username=new_username
    request.user.email=new_email
    request.user.save()
    return redirect("login_user")

@login_required
def logout_user(request):
    logout(request)
    return render(request,'Vendor_data/Login.html')

@login_required(login_url='vendor_login')
def add_products(request):

    if request.method == "POST":

        product_name = request.POST.get("product_name")
        category = request.POST.get("category")
        brand = request.POST.get("brand")

        price = request.POST.get("price")
        discount_price = request.POST.get("discount_price")

        stock = request.POST.get("stock")
        sku = request.POST.get("sku")

        short_description = request.POST.get(
            "short_description"
        )

        description = request.POST.get(
            "description"
        )

        specifications = request.POST.get(
            "specifications"
        )

        weight = request.POST.get("weight")

        delivery_time = request.POST.get(
            "delivery_time"
        )

        status = request.POST.get("status")

        main_image = request.FILES.get(
            "main_image"
        )

        Product.objects.create(

            vendor=request.user.vendor,

            product_name=product_name,

            category=category,

            brand=brand,

            price=price,

            discount_price=discount_price,

            stock=stock,

            sku=sku,

            main_image=main_image,

            short_description=short_description,

            description=description,

            specifications=specifications,

            weight=weight,

            delivery_time=delivery_time,

            status=status
        )

        return redirect(
            "manage_products"
        )

    return render(
        request,
        'Vendor_data/Add_Product_page.html'
    )
    

@login_required(login_url='vendor_login')
def manage_products(request):

    products = Product.objects.filter(
        vendor=request.user.vendor
    )

    context = {
        "products": products
    }

    return render(
        request,
        'Vendor_data/Manage_Products_page.html',
        context
    )

@login_required
def earnings(request):
    return render(request,'Vendor_data/Earnings.html')

@login_required
def orders(request):
    return render(request,'Vendor_data\Order_page(Vender View).html')