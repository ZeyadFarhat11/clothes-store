from django.urls import path
from . import views


urlpatterns = [
    path('carts/',views.CartList.as_view()),
    path('carts/details/',views.CartDetails.as_view()),
    path('carts/details/items/',views.CartItemList.as_view()),
    path('carts/details/items/<int:pk>/',views.CartItemDetails.as_view()),
]