import random
import time
from agora_token_builder import RtcTokenBuilder
from .models import RoomMember

from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .serializers import MemberSerializer

# Create your views here.
class GetTokenView(APIView):

    permission_classes = [ IsAuthenticated ]

    def get(self, request, *args, **kwargs):

        appId = "9c01a7dc56604b15b8a428063b7a4148"
        appCertificate = "2f90641900454ead8cb8c81b9d421b77"
        uid = random.randint(1, 230)
        expirationTimeInSeconds = 3600
        currentTimeStamp = int(time.time())
        privilegeExpiredTs = currentTimeStamp + expirationTimeInSeconds
        role = 1
        
        try:
            channelName = request.data['channel']

            token = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpiredTs)
        except:
            return Response({'data':None, 'status':status.HTTP_400_BAD_REQUEST, 'exito':False, 'error_message': 'Debes proporcionar un nombre para la sala de reunión'})
        
        return Response({'data': {'token': token, 'uid': uid}, 'status':status.HTTP_200_OK, 'exito':True})

class MemberView(APIView):
    
    permission_classes = [ IsAuthenticated ]
    serialiser_class = MemberSerializer

    def get(self, request, *args, **kwargs):
        
        uid = request.data['uid']
        room_name = request.data['room_name']

        member = get_object_or_404(RoomMember, uid=uid, room_name=room_name)
        serializer = self.serialiser_class(member, many=False)

        return Response({'data':serializer.data, 'status':status.HTTP_200_OK, 'exito': True})

    def post(self, request, *args, **kwargs):
        
        serializer = self.serialiser_class(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response({'data': serializer.data, 'status':status.HTTP_200_OK, 'exito':True})
        return Response({'data':None, 'status':status.HTTP_400_BAD_REQUEST, 'exito':False, 'error_message': 'Debes proporcionar un nombre para la sala de reunión'})

    def delete(self, request, *args, **kwargs):
        
        name = request.data['name']
        uid = request.data['uid']
        room_name = request.data['room_name']
        
        member = get_object_or_404(RoomMember, name=name, uid=uid, room_name=room_name)

        member.delete()

        return Response({'data': 'El miembro a sido eliminado', 'status': status.HTTP_200_OK, 'exito': True})
