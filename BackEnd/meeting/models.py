from django.db import models

# Create your models here.
class RoomMember(models.Model):
    
    foto = models.URLField(blank=True, null=True)
    room_id = models.CharField(max_length=200, blank=False, null=False)
    uid = models.CharField(max_length=1000, blank=False, null=False)
    nombre_usuario = models.CharField(max_length=200, blank=True, null=True)
    # insession = models.BooleanField(default=True)

    def __str__(self):
        return self.room_id