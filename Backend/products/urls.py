from django.urls import path
from .views import get_products  
from .views import get_categories 
from .views import (
    AddProductView,
    MyProductsView,
    UpdateProductView,
    DeleteProductView,
    ProductListView,
    ProductDetailView,
    VendorDashboardView
)

urlpatterns = [
    path("", get_products, name="product-list"),   # ✅ Main endpoint
    path("<int:pk>/", ProductDetailView.as_view(), name="product-detail"),
    path("add/", AddProductView.as_view(), name="add-product"),
    path("my-products/", MyProductsView.as_view(), name="my-products"),
    path("vendor-dashboard/",VendorDashboardView.as_view(), name="vendor-dashboard"),
    path("update/<int:pk>/", UpdateProductView.as_view(), name="update-product"),
    path("delete/<int:pk>/", DeleteProductView.as_view(), name="delete-product"),

    path("categories/", get_categories, name="categories"),
]