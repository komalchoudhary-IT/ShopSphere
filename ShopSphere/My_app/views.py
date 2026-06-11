from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request,"Vendor_data/index.html")

def register(request):
    return render(request, 'Vendor_data/Register.html')
 
def login_user(request):
    return render(request,'Vendor_data/Login.html')

def profile(request):
    return render(request,'Vendor_data/Profile.html')

def dashboard(request):
    return render(request,'Vendor_data/Dashboard.html')