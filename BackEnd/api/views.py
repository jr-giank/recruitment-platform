from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django_filters.rest_framework import DjangoFilterBackend

from . import serializers as s
from users.serializers import UserSerializer

from vacantes import models as m
from vacantes.functions import get_tokens_for_user
from users.models import CustomUser

# Create your views here.
class ApiView(APIView):

    def get(self, request, *args, **kwargs):
            
        api_urls = {
            'token': 'api/token/',
            'token-refresh': 'api/token/refresh/',
            
            'crear-usuario-candidato': 'api/register/',
            'crear-usuario-empresa': 'api/register/empresa/',
            'crear-vacante': 'api/vacantes/',
            'crear-solicitud': 'api/crear/solicitud/',
            
            'obtener-categorias': 'api/obtener/categorias/',
            'obtener-vacantes': 'api/vacantes/',
            'obtener-vacante': 'api/obtener/vacante/id_vacante/',
            'obtener-solicitudes-vacante': 'api/solicitudes/vacante/id_vacante/',
            'obtener-vacantes-empresa': 'api/vacantes/empresa/id_empresa/',
            'obtener-vacantes-guardadas-candidato': 'api/obtener/vacantes/candidato/id_candidato/',
            
            'eliminar-vacante-guardada': 'api/vacante/eliminar/guardada/id_usuario/id_vacante/',

            'guardar-vacante': 'api/vacante/guardar/',

            'filtrar-vacantes': 'api/filtrar/vacantes/',
        }

        return Response(api_urls)

#Token
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        user_instance = CustomUser.objects.get(email=user)

        if user.is_staff == False:
            candidato = m.Candidato.objects.get(usuario=user_instance.id)
            token['candidato_id'] = candidato.id
            token['first_name'] = candidato.nombre
            token['last_name'] = candidato.apellido
            token['email'] = user.email
            token['is_staff'] = user.is_staff
            token['foto'] = candidato.foto.url
        elif user.is_staff == True:
            empresa = m.Empresa.objects.get(usuario=user_instance.id)
            token['empresa_id'] = empresa.id
            token["nombre_empresa"] = empresa.nombre
            token["correo"] = user.email
            token["correo_vacantes"] = empresa.correo_vacantes
            token['is_staff'] = user.is_staff
            token["foto"] = empresa.foto.url

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

#Registro
class RegisterView(APIView):

    def post(self, request, *args, **kwargs):

        user = {"email": request.data['email'], "password": request.data['password']}

        serializer_user = UserSerializer(data=user)

        if serializer_user.is_valid():            
            candidato = {
                "nombre": request.data['nombre'],
                "apellido": request.data['apellido'],
                "pais": request.data['pais'],
                "foto": request.data['foto'],
                "sexo": request.data['sexo'],
                "nacimiento": request.data['nacimiento'],
                "titulo_personal": request.data['titulo_personal']
            }

            serializer_candidato = s.Candidato_Save_Serializer(data=candidato)
            
            if serializer_candidato.is_valid():
                serializer_user.save()
                user_instance = CustomUser.objects.get(email=request.data['email'])
                
                candidato.update({'usuario': user_instance.id})
                serializer_candidato = s.Candidato_Save_Serializer(data=candidato)

                if serializer_candidato.is_valid():
                    serializer_candidato.save()
                    candidato_instance = m.Candidato.objects.get(usuario=user_instance.id)
                    token = get_tokens_for_user(user=user_instance, candidato=candidato_instance)
                        
                    return Response({'data': serializer_user.data, 'token':token, 'status':200, 'exito':True})
            else:
                return Response({'data':None, 'status':400, 'exito':False, 'error_message': serializer_candidato.errors})
        else:
            return Response({'data':None, 'status':400, 'exito':False, 'error_message': serializer_user.errors})

class RegisterEmpresaView(APIView):

    def post(self, request, *args, **kwargs):

        user = {"email": request.data['email'], "password": request.data['password'], "is_staff": True}

        serializer_user_empresa = UserSerializer(data=user)

        if serializer_user_empresa.is_valid():            
            empresa = {
                "nombre": request.data['nombre'],
                "direccion": request.data['direccion'],
                "pais": request.data['pais'],
                "correo_vacantes": request.data['correo_vacantes'],
                "descripcion_empresa": request.data['descripcion_empresa'],
                "telefono": request.data['telefono'],
                "url_web": request.data['url_web'],
                "url_facebook": request.data['url_facebook'],
                "url_instagram": request.data['url_instagram'],
                "url_twitter": request.data['url_twitter'],
                "foto": request.data['foto']
            }

            serializer_empresa = s.Empresa_Save_Serializer(data=empresa)
            
            if serializer_empresa.is_valid():
                serializer_user_empresa.save()
                user_empresa_instance = CustomUser.objects.get(email=request.data['email'])
                
                empresa.update({'usuario': user_empresa_instance.id})
                serializer_empresa = s.Empresa_Save_Serializer(data=empresa)
                
                if serializer_empresa.is_valid():
                    serializer_empresa.save()
                    empresa_instance = m.Empresa.objects.get(usuario=user_empresa_instance.id)
                    token = get_tokens_for_user(user=user_empresa_instance, empresa=empresa_instance)
                        
                    return Response({'data': serializer_user_empresa.data, 'token':token, 'status':200, 'exito':True})
            else:
                return Response({'data':None, 'status':400, 'exito':False, 'error_message': serializer_empresa.errors})
        else:
            return Response({'data':None, 'status':400, 'exito':False, 'error_message': serializer_user_empresa.errors})

#Vacantes
class VacantesView(APIView):
    
    permission_classes = [ IsAuthenticated ]
    serializer_class = s.Vacante_Serializer
    
    def get(self, request, *args, **kwargs):
        vacantes = m.Vacante.objects.all()
        serializer = s.Obtener_Vacantes_Serializer(vacantes, many=True)

        return Response({'data':serializer.data, 'status':200, 'exito':True})
    
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response({'data':serializer.data, 'status':200, 'exito': True})
        else:
            return Response({'data':None, 'status':400, 'exito':False, 'error message':serializer.errors})

class ObtenerVacanteView(APIView):

    permission_classes = [ IsAuthenticated ]
    serializer_class = s.Obtener_Vacante_Serializer

    def get(self, request, *args, **kwargs):
        pk = self.kwargs["pk"]

        vacante = m.Vacante.objects.filter(id=pk)
        serializer = self.serializer_class(vacante, many=True)

        return Response({'data':serializer.data, 'status':200, 'exito':True})

class FiltrarVacantes(ListAPIView):

    permission_classes = [ IsAuthenticated ]
    filter_backends = [ DjangoFilterBackend ]
    serializer_class = s.Obtener_Vacantes_Serializer
    queryset = m.Vacante.objects.all()
    filterset_fields = {
        'categoria': ['in'],
        'forma_trabajo': ['in'], 
        'experiencia': ['exact'], 
        'tipo_trabajo': ['in'], 
        'empresa__pais': ['in']
    }

#Empresa
class EmpresaView(APIView):

    permission_classes = [ IsAuthenticated ]
    serializer_class = s.Empresa_Serializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response({'data':serializer.data, 'status':200, 'exito': True})
        else:
            return Response({'data':None, 'status':400, 'exito':False, 'error message':serializer.errors})

class VacantesEmpresaView(ApiView):

    permission_classes = [ IsAuthenticated ]
    serializer_class = s.Obtener_Vacantes_Serializer

    def get(self, request, *args, **kwargs):

        pk_empresa = self.kwargs['pk']

        vacantes = m.Vacante.objects.filter(empresa=pk_empresa).order_by('-fecha', '-hora')
        serializer = self.serializer_class(vacantes, many=True)

        return Response({'data':serializer.data, 'status':200, 'exito':True})

#Candidato
class CandidatoView(APIView):

    permission_classes = [ IsAuthenticated ]
    serializer_class = s.Candidato_Serializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response({'data':serializer.data, 'status':200, 'exito': True})
        else:
            return Response({'data':None, 'status':400, 'exito':False, 'error message':serializer.errors})

#Solicitudes
class SolicitudesView(APIView):

    permission_classes = [ IsAuthenticated ]
    serializer_class = s.Solicitude_Serializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response({'data':serializer.data, 'status':200, 'exito': True})
        else:
            return Response({'data':None, 'status':400, 'exito':False, 'error message':serializer.errors})

class SolicitudesVacanteView(ApiView):

    permission_classes = [ IsAuthenticated ]
    serializer_class = s.Solicitude_Vacante_Serializer

    def get(self, request, *args, **kwargs):

        pk_vacante = self.kwargs['pk']

        solicitudes = m.Solicitude.objects.filter(vacante=pk_vacante).order_by('-fecha')
        serializer = self.serializer_class(solicitudes, many=True)

        return Response({'data':serializer.data, 'status':200, 'exito':True})

#Vacantes Guardadas
class VacantesGuardadasView(ApiView):

    permission_classes = [ IsAuthenticated ]
    serializer_class = s.Vacantes_Guardadas_Serializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response({'data':serializer.data, 'status':200, 'exito':True})
        else:
            return Response({'data':None, 'status':400, 'exito':False, 'error message':serializer.errors})

    def delete(self, request, *args, **kwargs):
        id_usuario = self.kwargs['id_usuario']
        id_vacante = self.kwargs['id_vacante']

        vacante = m.VacantesGuardadas.objects.filter(usuario=id_usuario, vacante=id_vacante)
        
        if vacante:
            vacante.delete()

            return Response({'message':'La vacante a sido eliminada', 'status':200, 'exito':True})
        else:
            return Response({'message':'La vacante especificada no a sido guardada por dicho usuario', 'status':400, 'exito':False})

class ObtenerVacantesGuardadasView(ApiView):

    permission_classes = [ IsAuthenticated ]
    serializer_class = s.Obtener_Vacantes_Guardadas_Serializer

    def get(self, request, *args, **kwargs):

        id_usuario = self.kwargs['pk']

        user = m.VacantesGuardadas.objects.filter(usuario=id_usuario)
        serializer = self.serializer_class(user, many=True)

        return Response({'data':serializer.data, 'status':200, 'exito':True})

#Categoria
class ObtenerCategoriasView(APIView):

    permission_classes = [ IsAuthenticated ]
    serializer_class = s.Categoria_Serializer

    def get(self, request, *args, **kwargs):

        categorias = m.Categoria.objects.all()

        serializer = self.serializer_class(categorias, many=True)

        return Response({'data':serializer.data, 'status':200, 'exito':True})
