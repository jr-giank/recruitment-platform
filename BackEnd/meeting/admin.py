from django.contrib import admin
from .models import RoomMember
# Register your models here.

class ShowIdAdmin(admin.ModelAdmin):
    readonly_fields = ['id'] 

# Register your models here.
admin.site.register(RoomMember, ShowIdAdmin)