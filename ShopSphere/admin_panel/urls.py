from django.urls import path
from . import views

urlpatterns = [
    path('dashboard/', views.dashboard, name='dashboard'),
    path('categories/', views.categories, name='categories'),
    path('delete_category/<int:id>/', views.delete_category,name='delete_category'),
]