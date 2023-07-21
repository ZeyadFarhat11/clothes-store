from rest_framework import serializers
from .models import Product,Color

class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = '__all__'
        read_only_fields = ['id',]


class ProductSerializer(serializers.ModelSerializer):
    colors = ColorSerializer(many=True)
    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ['id']

    def create(self, validated_data):
        # Extract the color data from the validated data
        color_data = validated_data.pop('colors', [])

        product = Product.objects.create(**validated_data)

        for color in color_data:
            color_obj, created = Color.objects.get_or_create(**color)
            product.colors.add(color_obj)

        return product
