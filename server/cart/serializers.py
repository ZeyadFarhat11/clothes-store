from rest_framework import serializers
from .models import Cart, CartItem

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['id','product','quantity']
        # read_only_field = 'id'


class CartSerializer(serializers.ModelSerializer):
    cartitem_set = CartItemSerializer(many=True,required=False,read_only = True)
    total_price = serializers.SerializerMethodField()

    def get_total_price(self,obj):
        total = 0
        for item in obj.cartitem_set.all():
            total += item.product.price * item.quantity
        return total
    
    class Meta:
        model = Cart
        fields = '__all__'
        read_only_fields = ['user','created_at']