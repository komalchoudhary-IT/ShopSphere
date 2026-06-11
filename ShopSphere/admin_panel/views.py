from django.shortcuts import render,redirect
from .models import Category

# Create your views here.
def dashboard (request):
   return render(request,"dashboard.html")

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
