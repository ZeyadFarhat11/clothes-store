from django.db import models
from django.core.validators import MinValueValidator

# Create your models here.
class Color(models.Model):
    name = models.CharField(max_length=32)
    rgb = models.CharField(max_length=20)
    
    def __str__(self) -> str:
        return self.name


class Product(models.Model):
    title = models.CharField(max_length=200,unique=True)
    size = models.CharField(max_length=20)
    colors = models.ManyToManyField(Color)
    image = models.ImageField(upload_to='uploads/images',null=True)
    stock_number = models.IntegerField(validators=[MinValueValidator(10)],default=10)
    price = models.DecimalField(max_digits=8,decimal_places=2)
    description = models.TextField(max_length=800)
    
    def __str__(self) -> str:
        return self.title



