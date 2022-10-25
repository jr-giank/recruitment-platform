from rest_framework import serializers

from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)
    is_staff = serializers.BooleanField(default=False)

    class Meta:
        model = get_user_model()
        fields = ['email', 'password', 'is_staff']

    def validate_password(self, value):
        return make_password(value)