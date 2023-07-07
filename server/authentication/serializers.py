from rest_framework import serializers
from django.contrib.auth.models import User


class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=32)
    email = serializers.EmailField(max_length=255)
    first_name = serializers.CharField(max_length=20)
    last_name = serializers.CharField(max_length=20)
    password = serializers.CharField(max_length=32,min_length=6,write_only=True)

    class Meta:
        model = User
        fields = ['username','email','first_name','last_name','password']

    def create(self, validated_data):
        user= User.objects.create_user(**validated_data)
        return user
    
