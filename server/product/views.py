from .models import Product,Color
from .serializers import ProductSerializer,ColorSerializer
from rest_framework import generics,filters
from rest_framework import permissions
from .permissions import IsAdminUserOrReadOnly

class ColorList(generics.ListCreateAPIView):
    queryset = Color.objects.all()
    serializer_class = ColorSerializer

class ColorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Color.objects.all()
    serializer_class = ColorSerializer
    lookup_field = 'id'

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

