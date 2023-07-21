from django.urls import path
from . import views

urlpatterns = [
    path('payment/',views.PaymentView.as_view())
]