from .models import Product
from .serializers import ProductSerializer
from rest_framework import generics,filters
from rest_framework import permissions
from .permissions import IsAdminUserOrReadOnly



class ProductAPIView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminUserOrReadOnly]

    def get_queryset(self):
        queryset = super().get_queryset()
        title = self.request.query_params.get('title', None)
        price = self.request.query_params.get('price', None)
        if title is not None  :
            queryset = queryset.filter(title__icontains=title)
        if price is not None :
            queryset = queryset.filter(price__icontains=price)
        return queryset


class ProductAPIViewDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAdminUser]
    lookup_field = 'id'

