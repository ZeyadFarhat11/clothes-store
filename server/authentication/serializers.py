from rest_framework import serializers
from django.contrib.auth.models import User

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255,)
    first_name = serializers.CharField(max_length=16,min_length=3)
    last_name = serializers.CharField(max_length=16,min_length=3)
    password = serializers.CharField(max_length=32,min_length=6,write_only=True)

    class Meta:
        model = User
        fields = ['email','first_name','last_name','password']


    def validate_username(self, value):
        if not value.isalnum():
            raise serializers.ValidationError(f'{value} should only contain alphanumeric characters')

        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError({"path": "username", "value": value, "message": "username already exist."})
        return value
    
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError({"path": "email", "value": value, "message": "email already exist."})
        return value

    def create(self, validated_data):
        user= User.objects.create_user(**validated_data)
        return user
    
    
class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length = 255)
    username = serializers.CharField(max_length=32,read_only=True)
    password = serializers.CharField(max_length=32,min_length=6,write_only=True)
    tokens = serializers.SerializerMethodField()
