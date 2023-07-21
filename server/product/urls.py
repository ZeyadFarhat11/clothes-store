from django.urls import path
from . import views

urlpatterns = [
    path('colors/',views.ProductAPIView.as_view()),
    path('colors/<int:id>/',views.ProductAPIView.as_view()),
    path('products/',views.ProductAPIView.as_view()),
    path('products/<int:id>/',views.ProductAPIViewDetails.as_view()),

]