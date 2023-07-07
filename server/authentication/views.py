from rest_framework import generics,response,status
from django.contrib.auth.models import User
from .serializers import RegisterSerializer,LoginSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self,request):
        serializer = self.serializer_class(date=request.data)
        serializer.is_valid(raise_exception=True)

        return response.Response(serializer.data,status=status.HTTP_200_OK)
    
