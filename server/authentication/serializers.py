from rest_framework import serializers 
from .models import User
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=32,min_length=6,
                                     write_only = True,required=True,
                                     style = {'input_type':'password'})
    
    class Meta:
        model = User
        fields = ['email','first_name','last_name','password'] 
    
    def validate_email(self,value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError({'path':'email','value':value,'message':'email already exist.'})
        return value
    
    def validate_first_name(self, value):
        if not value.isalpha():
            raise serializers.ValidationError('First name must contain only letters.')
        return value
    
    def validate_last_name(self, value):
        if not value.isalpha():
            raise serializers.ValidationError('Last name must contain only letters.')
        return value
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
        #return {"success":"True"}

