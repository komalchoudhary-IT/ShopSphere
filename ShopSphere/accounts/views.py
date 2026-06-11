from django.shortcuts import render,redirect
from django.shortcuts import redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout
# Create your views here.
def home(request):
    return render(request,"home.html")

def register(request):
 if request.method == "POST":
           
     fullname = request.POST.get("fullname")
     username = request.POST.get("username")
     email = request.POST.get("email")
     password = request.POST.get("password")
  
     User.objects.create_user(
     first_name=fullname,
     username=username,
     email=email,
     password=password
    )
    
     return redirect("login/")

 return render(request, "register.html")

def login_user(request):
 if request.method=="POST":
        username=request.POST.get("username")
        password=request.POST.get("password")
        
        user= authenticate(
               request,
               username=username,
            password=password
        )  
        if user is not None:
            login(request, user)
            return redirect("home")

        else:
         return render(request,"login.html",{"message": "Invalid Credentials"})
             
      
 return render(request,"login.html")

def logout_user(request):
   logout(request)
   return redirect("login")