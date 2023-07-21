from rest_framework import generics
from rest_framework.response import Response
from .serializers import PaymentSerializer
import stripe
from rest_framework import permissions
from cart.models import Cart, CartItem

class PaymentView(generics.GenericAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # process the payment using Stripe API
        stripe.api_key = 'sk_test_51NW3FGDVAcOX6hNx9eNmdaJOpBOCzzhPRuV9RrQfbZo3ge4Zzq14aCdMKnfKfPRjjNJhD79dGoGUk289wD0Znb1d00cZxFVKMP'
        try:
            cart = Cart.objects.get(user_id=self.request.user.id)
            cart_items =  CartItem.objects.filter(cart_id=cart.id) 
            result = 0
            for item in cart_items:
                result += item.product.price
            print(result)
                
            charge = stripe.Charge.create(
                amount=int(result ),
                currency='eur',
                description='Payment',
                source={
                    'number': serializer.validated_data['card_number'],
                    'exp_month': serializer.validated_data['card_expiry'][:2],
                    'exp_year': serializer.validated_data['card_expiry'][3:],
                    'cvc': serializer.validated_data['card_cvv']
                }
            )
            # return a success response
            return Response({'message': 'Payment successful.'})
        except stripe.error.CardError:
            # return an error response for invalid card details
            return Response({'message': 'Invalid card details.'}, status=400)
