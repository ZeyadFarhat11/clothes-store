from rest_framework import serializers
from .models import Product,Color, Size

class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = '__all__'
        read_only_fields = ['id',]

class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = ['name',]

class ProductSerializer(serializers.ModelSerializer):
    colors = ColorSerializer(many=True)
    size = SizeSerializer(many=True)
    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ['id']

    def create(self, validated_data):
        # Extract the color data from the validated data
        color_data = validated_data.pop('colors', [])
        size_data = validated_data.pop('size', [])

        product = Product.objects.create(**validated_data)

        for color in color_data:
            color_obj, created = Color.objects.get_or_create(**color)
            product.colors.add(color_obj)

        for size in size_data:
            size_obj, created = Size.objects.get_or_create(**size)
            product.colors.add(size_obj)

        return product
    
