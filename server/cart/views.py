from rest_framework import generics
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer
# Create your views here.

class CartList(generics.ListCreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

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
        return CartItem.objects.filter(cart__id=self.kwargs['cart_pk'])
    
    def perform_create(self, serializer):
        cart = Cart.objects.get(pk=self.kwargs['cart_pk'],)
        serializer.save(cart=cart)


class CartItemDetails(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CartItemSerializer


    def get_queryset(self):
        return CartItem.objects.filter(cart__id=self.kwargs['cart_pk'])
