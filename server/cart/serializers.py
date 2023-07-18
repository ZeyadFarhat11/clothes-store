from rest_framework import serializers
from .models import Cart, CartItem

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['id','product','quantity']
        # read_only_field = 'id'


class CartSerializer(serializers.ModelSerializer):
    item = CartItemSerializer(many=True,required=False)

    class Meta:
        model = Cart
        fields = '__all__'
        read_only_fields = ['user','created_at']
        