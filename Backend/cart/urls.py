from django.urls import path
from .views import *

urlpatterns = [
    path("add/", AddToCartView.as_view(), name="add-to-cart"),
    path("", ViewCartView.as_view(), name="view-cart"),
    path("update/<int:pk>/", UpdateCartView.as_view()),
    path("remove/<int:pk>/", RemoveCartItemView.as_view(), name="remove-cart-item"),
]