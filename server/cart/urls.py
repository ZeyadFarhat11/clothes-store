from django.urls import path
from . import views


urlpatterns = [
    path('carts/',views.CartList.as_view()),
    path('carts/<int:pk>/',views.CartDetails.as_view()),
    path('carts/<int:cart_pk>/items/',views.CartItemList.as_view()),
    path('carts/<int:cart_pk>/items/<int:pk>/',views.CartItemDetails.as_view()),
]