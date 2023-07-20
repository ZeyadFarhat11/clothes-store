from django.db import models
from django.contrib.auth.models import User
from product.models import Product
from django.utils import timezone
from django.conf import settings
# Create your models here.

class Cart(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self) -> str:
        return str(self.user)

class CartItem(models.Model):
    cart = models.ForeignKey(Cart,on_delete=models.CASCADE)
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=0)

    def save(self, *args, **kwargs):
        self.product.stock_number -= self.quantity
        self.product.save()
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f'{str(self.product.title)} - {str(self.cart.user)}'

