from django.shortcuts import render , redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate ,logout,login
from django.contrib.auth.decorators import login_required
from .models import Vendor

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