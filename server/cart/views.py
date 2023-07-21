from rest_framework import generics
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer
# Create your views here.


class CartList(generics.ListCreateAPIView):
    queryset = Cart.objects.first()
    serializer_class = CartSerializer
    pagination_class = None

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        user = self.request.user
        cart = Cart.objects.create(user=user)

class CartDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

    def get_object(self):
        return Cart.objects.get(user=self.request.user)



class CartItemList(generics.ListCreateAPIView):
    serializer_class = CartItemSerializer

    def get_queryset(self):
        user = self.request.user
        cart = Cart.objects.get(user_id=user.id)
        return CartItem.objects.filter(cart_id=cart.id) 
    
    def perform_create(self, serializer):
        user = self.request.user
        cart = Cart.objects.get(user_id=user.id)
        serializer.save(cart=cart)


class CartItemDetails(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CartItemSerializer

    def get_queryset(self):
        user = self.request.user
        cart = Cart.objects.get(user_id=user.id)
        return CartItem.objects.filter(cart_id=cart.id)