from django.contrib import admin
from django.contrib.auth.models import Group

from .models import CustomUser
from vacantes.admin import ShowIdAdmin

# Register your models here.
admin.site.register(CustomUser, ShowIdAdmin)
admin.site.unregister(Group)