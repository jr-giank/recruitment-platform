from rest_framework import serializers

from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)
<<<<<<< HEAD
    # username = serializers.CharField(required=True)
=======
>>>>>>> ff67184 (Changing fields and deleteting fields of users)
    is_staff = serializers.BooleanField(default=False)

    class Meta:
        model = get_user_model()
        fields = ['email', 'password', 'is_staff']
<<<<<<< HEAD

    def validate_password(self, value):
        return make_password(value)

class EmpresaSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)
    is_staff = serializers.BooleanField(default=False)

    class Meta:
        model = get_user_model()
        fields = ['email', 'password', 'is_staff']
=======
>>>>>>> ff67184 (Changing fields and deleteting fields of users)

    def validate_password(self, value):
        return make_password(value)