from django.urls import path
from .views import (
    PlaceOrderView,
    MyOrdersView,
    VendorOrdersView,
    UpdateOrderStatusView
)

urlpatterns = [
    path("place/", PlaceOrderView.as_view()),
    path("my-orders/", MyOrdersView.as_view()),
    path("vendor-orders/", VendorOrdersView.as_view()),
    path("update-status/<int:pk>/", UpdateOrderStatusView.as_view()),
]