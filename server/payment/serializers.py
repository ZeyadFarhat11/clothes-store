from rest_framework import serializers

class PaymentSerializer(serializers.Serializer):
    card_number = serializers.CharField(max_length=16)
    card_expiry = serializers.CharField(max_length=5)
    card_cvv = serializers.CharField(max_length=3)