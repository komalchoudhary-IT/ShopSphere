from django.urls import path, include
from . import views
from .views import customer_list, reports, OrderViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'orders', OrderViewSet)

urlpatterns = [
    path('', views.dashboard, name='dashboard'),

    path('categories/', views.categories, name='categories'),
    path('delete-category/<int:id>/', views.delete_category, name='delete_category'),

    path('products/', views.products, name='products'),
    path('delete-product/<int:id>/', views.delete_product, name='delete_product'),
    path('edit-product/<int:id>/', views.edit_product, name='edit_product'),

    path('vendors/', views.vendors, name='vendors'),
    path('approve-vendor/<int:id>/', views.approve_vendor, name='approve_vendor'),
    path('delete-vendor/<int:id>/', views.delete_vendor, name='delete_vendor'),

    path('api/customers/', customer_list),
    path('api/delete-customer/<int:id>/', views.delete_customer, name='delete_customer'),

    path('api/reports/', reports),

    path('', include(router.urls)),
    path('reports/', views.reports_api, name='reports'), 

    path('change-password/', views.change_password,name='change_password'),
    path('profile/', views.profile,name='profile'),
    
]