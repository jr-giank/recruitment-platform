from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import Candidato_Serializer, Vacante_Serializer, Obtener_Vacantes_Serializer, Empresa_Serializer, Solicitude_Serializer, Solicitude_Vacante_Serializer, Vacantes_Guardadas_Serializer, Obtener_Vacantes_Guardadas_Serializer
from users.serializers import UserSerializer

from vacantes.models import Vacante, Solicitude, VacantesGuardadas
from vacantes.functions import get_tokens_for_user
from users.models import CustomUser

# Create your views here.
class ApiView(APIView):

    def get(self, request, *args, **kwargs):
            
        api_urls = {
            'token': 'api/token',
            'token-refresh': 'api/token/refresh',
            
            'crear-usuario': 'api/register',
            'crear-vacante': 'api/vacantes',
            'crear-empresa': 'api/crear/empresa',
            'crear-candidato': 'api/crear/candidato',
            'crear-solicitud': 'api/crear/solicitud/',
            
            'obtener-vacantes': 'api/vacantes',
            'obtener-vacante': 'api/obtener/vacante/id',
            'obtener-solicitudes-vacante': 'api/solicitudes/vacante/id',
            'obtener-vacantes-empresa': 'api/vacantes/empresa/id',
            'obtener-vacantes-guardadas-candidato': 'api/obtener/vacantes/candidato/id',
            
            'eliminar-vacante-guardada': 'api/eliminar/vacante/guardada/id',

            'guardar-vacante': 'api/vacantes/guardas',
        }

        return Response(api_urls)

#Token
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['is_staff'] = user.is_staff

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

#Registro
class RegisterView(APIView):

    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            user = CustomUser.objects.get(email=serializer.data['email'])
            token = get_tokens_for_user(user=user)
            
            return Response({'data':serializer.data, 'token':token, 'status':200, 'exito':True})
        else:
            return Response({'data':None, 'status':400, 'exito':False, 'error_message': serializer.errors})

#Vacantes
class VacantesView(APIView):
    permission_classes = [ IsAuthenticated ]
    serializer_class = Vacante_Serializer
    
    def get(self, request, *args, **kwargs):
        vacantes = Vacante.objects.all()
        serializer = Obtener_Vacantes_Serializer(vacantes, many=True)

        return Response({'data':serializer.data, 'status':200, 'exito':True})
    
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response({'data':serializer.data, 'status':200, 'exito': True})
        else:
            return Response({'data':None, 'status':400, 'exito':False, 'error message':serializer.errors})

class ObtenerVacanteView(APIView):

    serializer_class = Vacante_Serializer

    def get(self, request, *args, **kwargs):
        pk = self.kwargs["pk"]

        vacante = Vacante.objects.filter(id=pk)
        serializer = Vacante_Serializer(vacante, many=True)

        return Response({'data':serializer.data, 'status':200, 'exito':True})

#Empresa
class EmpresaView(APIView):

    serializer_class = Empresa_Serializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response({'data':serializer.data, 'status':200, 'exito': True})
        else:
            return Response({'data':None, 'status':400, 'exito':False, 'error message':serializer.errors})

class VacantesEmpresaView(ApiView):

    serializer_class = Obtener_Vacantes_Serializer

    def get(self, request, *args, **kwargs):

        pk_empresa = self.kwargs['pk']

        vacantes = Vacante.objects.filter(empresa=pk_empresa).order_by('-fecha', '-hora')
        serializer = self.serializer_class(vacantes, many=True)

        return Response({'data':serializer.data, 'status':200, 'exito':True})

#Candidato
class CandidatoView(APIView):

    serializer_class = Candidato_Serializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response({'data':serializer.data, 'status':200, 'exito': True})
        else:
            return Response({'data':None, 'status':400, 'exito':False, 'error message':serializer.errors})

#Solicitudes
class SolicitudesView(APIView):

    serializer_class = Solicitude_Serializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response({'data':serializer.data, 'status':200, 'exito': True})
        else:
            return Response({'data':None, 'status':400, 'exito':False, 'error message':serializer.errors})

class SolicitudesVacanteView(ApiView):

    serializer_class = Solicitude_Vacante_Serializer

    def get(self, request, *args, **kwargs):

        pk_vacante = self.kwargs['pk']

        solicitudes = Solicitude.objects.filter(vacante=pk_vacante).order_by('-fecha')
        serializer = self.serializer_class(solicitudes, many=True)

        return Response({'data':serializer.data, 'status':200, 'exito':True})

#Vacantes Guardadas
class VacantesGuardadasView(ApiView):

    serializer_class = Vacantes_Guardadas_Serializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response({'data':serializer.data, 'status':200, 'exito':True})
        else:
            return Response({'data':None, 'status':400, 'exito':False, 'error message':serializer.errors})

    def delete(self, request, *args, **kwargs):
        pk_vacante = self.kwargs['pk']

        vacante = VacantesGuardadas.objects.filter(vacante=pk_vacante)
        vacante.delete()

        return Response({'message':'La vacante a sido eliminada', 'status':200, 'exito':True})

class ObtenerVacantesGuardadasView(ApiView):

    serializer_class = Obtener_Vacantes_Guardadas_Serializer

    def get(self, request, *args, **kwargs):

        pk_candidato = self.kwargs['pk']

        user = VacantesGuardadas.objects.filter(usuario=pk_candidato)
        serializer = self.serializer_class(user, many=True)

        return Response({'data':serializer.data, 'status':200, 'exito':True})
