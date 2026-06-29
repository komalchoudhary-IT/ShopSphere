from django.urls import path
from .views import (
    AddProductView,
    MyProductsView,
    UpdateProductView,
    DeleteProductView,
    ProductListView,
)

urlpatterns = [
    path("", ProductListView.as_view(), name="product-list"),
    path("add/", AddProductView.as_view(), name="add-product"),
    path("my-products/", MyProductsView.as_view(), name="my-products"),
    path("update/<int:pk>/", UpdateProductView.as_view(), name="update-product"),
    path("delete/<int:pk>/", DeleteProductView.as_view(), name="delete-product"),
]