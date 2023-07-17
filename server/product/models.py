from django.db import models
from django.core.validators import MinValueValidator

# Create your models here.

class Product(models.Model):
    title = models.CharField(max_length=200,unique=True)
    size = models.CharField(max_length=20)
    color = models.CharField(max_length=80)
    stock_number = models.IntegerField(validators=[MinValueValidator(10)],default=10)
    image = models.ImageField(upload_to='images',null=True)
    price = models.DecimalField(max_digits=8,decimal_places=2)
    description = models.TextField(max_length=800)
    
    def __str__(self) -> str:
        return self.title



