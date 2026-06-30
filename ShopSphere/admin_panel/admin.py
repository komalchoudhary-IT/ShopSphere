from django.contrib import admin
from .models import Category
from .models import Products
from django.contrib import admin
from .models import Customer



# Register your models here.
admin.site.register(Category)
admin.site.register(Products)
admin.site.register(Customer)
