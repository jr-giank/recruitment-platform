from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):

    email = models.EmailField(max_length=150, unique=True)
    first_name = models.CharField(max_length=70, unique=True, blank=True, null=True)
    last_name = models.CharField(max_length=70, unique=True, blank=True, null=True)
    username = models.CharField(max_length=70, unique=True, blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['password']