from rest_framework.serializers import ModelSerializer

from .models import RoomMember

class MemberSerializer(ModelSerializer):

    class Meta:
        model = RoomMember
        fields = '__all__'