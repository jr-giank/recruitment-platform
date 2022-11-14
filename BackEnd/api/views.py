from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status

from django.http import Http404
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
    
            'register':{
                'registrar-candidato': 'api/register/',
                'registrar-empresa': 'api/register/empresa/',
            },

            'token': {
                'obtener-token': 'api/token/',
                'obtener-token-refresh': 'api/token/refresh/',
            },

            'vacantes': {
                'crear-vacante': 'api/vacantes/',
                'obtener-vacantes-empresa': 'api/vacantes/empresa/id_empresa/',
                'obtener-vacante': 'api/vacante/id_vacante/',
                'obtener-vacantes-guardadas': 'api/vacante/guardada/id_candidato/',
                'editar-vacante': 'api/vacante/id_vacante/',
                'guardar-vacante': 'api/vacante/guardar/',
                'eliminar-vacante': 'api/vacante/id_vacante/',
                'eliminar-vacante-guardada': 'api/vacante/guardada/eliminar/id_usuario/id_vacante/',
                'filtrar-vacantes': 'api/vacantes/filtrar/',
            },

            'solicitudes': {
                'crear-solicitud': 'api/solicitud/',
                'atualizar-solicitud': 'api/solicitud/id_solicitud/',
                'obtener-solicitudes-vacante': 'api/solicitudes/vacante/id_vacante/',  
                'obtener-solicitudes-candidato': 'api/solicitudes/candidato/id_candidato/',
            },   

            'candidatos': {
                'obtener-candidato': 'api/candidato/id_candidato/',
                'editar-candidato': 'api/candidato/id_candidato/',
                'proyecto': {
                    'registrar-proyecto': 'api/proyecto/',
                    'editar-proyecto': 'api/proyecto/id_proyecto/',
                    'eliminar-proyecto': 'api/proyecto/id_proyecto/',
                },
                'experiencia': {
                    'registrar-experiencia': 'api/experiencia/',
                    'editar-experiencia': 'api/experiencia/id_experiencia/',
                    'eliminar-experiencia': 'api/experiencia/id_experiencia/',
                },
                'tecnologia': {
                    'registrar-tecnologia': 'api/tecnologia/',
                    'editar-tecnologia': 'api/tecnologia/id_tecnologia/',
                    'eliminar-tecnologia': 'api/tecnologia/id_tecnologia/',
                },
                'pruebas-tecnicas': { 
                    'obtener-prueba-asignada': 'api/prueba/asignada/id_candidato>/',
                }
            },

            'empresa': {
                'obtener-empresa': 'api/empresa/id_empresa/',
            },

            'categorias': {
                'obtener-categorias': 'api/categorias/',
            },

            'mensajes': {
                'actualizar-mensajes': 'api/mensaje/id_mensaje/',
                'obtener-mensajes': 'api/mensaje/id_usuario/',
            },

            'pruebas': {
                'crear-prueba': 'api/prueba/',
                'actualizar-prueba': 'api/prueba/id_prueba>/',
                'obtener-pruebas-empresa': 'api/prueba/id_empresa>/',
            },

            'pruebas-tecnicas-asignadas': { 
                'crear-asignacion-prueba': 'api/prueba/asignada/',
                'actualizar-prueba-asignada': 'api/prueba/asignada/id_prueba_tecnica_asignada>/',
            }
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

            serializer_candidato = s.Candidato_Serializer(data=candidato)
            
            if serializer_candidato.is_valid():
                serializer_user.save()
                user_instance = CustomUser.objects.get(email=request.data['email'])
                
                candidato.update({'usuario': user_instance.id})
                serializer_candidato = s.Candidato_Serializer(data=candidato)

                if serializer_candidato.is_valid():
                    serializer_candidato.save()
                    candidato_instance = m.Candidato.objects.get(usuario=user_instance.id)
                    token = get_tokens_for_user(user=user_instance, candidato=candidato_instance)
                        
                    return Response({'data': serializer_user.data, 'token':token, 'status':status.HTTP_201_CREATED, 'exito':True})
            else:
                return Response({'data':None, 'status':status.HTTP_400_BAD_REQUEST, 'exito':False, 'error_message': serializer_candidato.errors})
        else:
            return Response({'data':None, 'status':status.HTTP_400_BAD_REQUEST, 'exito':False, 'error_message': serializer_user.errors})

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

            serializer_empresa = s.Empresa_Serializer(data=empresa)
            
            if serializer_empresa.is_valid():
                serializer_user_empresa.save()
                user_empresa_instance = CustomUser.objects.get(email=request.data['email'])
                
                empresa.update({'usuario': user_empresa_instance.id})
                serializer_empresa = s.Empresa_Serializer(data=empresa)
                
                if serializer_empresa.is_valid():
                    serializer_empresa.save()
                    empresa_instance = m.Empresa.objects.get(usuario=user_empresa_instance.id)
                    token = get_tokens_for_user(user=user_empresa_instance, empresa=empresa_instance)
                        
                    return Response({'data': serializer_user_empresa.data, 'token':token, 'status':status.HTTP_201_CREATED, 'exito':True})
            else:
                return Response({'data':None, 'status':status.HTTP_400_BAD_REQUEST, 'exito':False, 'error_message': serializer_empresa.errors})
        else:
            return Response({'data':None, 'status':status.HTTP_400_BAD_REQUEST, 'exito':False, 'error_message': serializer_user_empresa.errors})

#Vacantes
class VacantesView(APIView):
    
    permission_classes = [ IsAuthenticated ]
    serializer_class = s.Vacante_Serializer
    
    def get(self, request, *args, **kwargs):
        vacantes = m.Vacante.objects.all()
        serializer = self.serializer_class(vacantes, many=True)

        return Response({'data':serializer.data, 'status':status.HTTP_200_OK, 'exito':True})
    
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response({'data':serializer.data, 'status':status.HTTP_200_OK, 'exito': True})
        return Response({'data':None, 'status':status.HTTP_400_BAD_REQUEST, 'exito':False, 'error message':serializer.errors})

class VacanteView(APIView):

    # permission_classes = [ IsAuthenticated ]
    serializer_class = s.Vacante_Serializer

    def get_object(self, pk):
        # Returns an object instance that should 
        # be used for detail views.
        try:
            return m.Vacante.objects.get(pk=pk)
        except m.Vacante.DoesNotExist:
            raise Http404

    def get(self, request, *args, **kwargs):
        pk = self.kwargs["id_vacante"]

        vacante = m.Vacante.objects.filter(id=pk)
        serializer = self.serializer_class(vacante, many=True)

        return Response({'data':serializer.data, 'status':status.HTTP_200_OK, 'exito':True})

    def put(self, request, id_vacante):
        pk = self.get_object(id_vacante)
        serializer = self.serializer_class(pk, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({'data':serializer.data, 'status':status.HTTP_200_OK, 'exito':True})
        return Response({'data':None, 'status':status.HTTP_400_BAD_REQUEST, 'exito':False, 'error message':serializer.errors})

    def delete(self, request, *args, **kwargs):
        pk = self.kwargs['id_vacante']

        nuevo_mensaje = {
            "usuario": request.data['usuario'],
            "texto": request.data['texto'],
            "motivo_mensaje": request.data['motivo_mensaje']
        }

        mensaje_serializer = s.Mensaje_Serializer(data=nuevo_mensaje)
        solicitudes = m.Solicitude.objects.filter(vacante=pk)

        if solicitudes:
            if mensaje_serializer.is_valid():
                mensaje_serializer.save()

                for solicitud in solicitudes:
                    
                    candidato = m.Candidato.objects.get(id=solicitud.candidato.id)

                    destino = {
                        "mensaje": mensaje_serializer.data['id'],
                        "usuario_destino": candidato.usuario.id
                    }
                    
                    serializer_mensaje_destino = s.Mensajes_Destino_Serializer(data=destino)

                    if serializer_mensaje_destino.is_valid():
                        serializer_mensaje_destino.save()

                vacante = m.Vacante.objects.filter(id=pk)
                vacante.delete()

                return Response({'message':'La vacante a sido eliminada', 'status':status.HTTP_200_OK, 'exito':True})
            return Response({'data':None, 'status':status.HTTP_400_BAD_REQUEST, 'exito':False, 'error message':mensaje_serializer.errors})
        else:
            vacante = m.Vacante.objects.filter(id=pk)
            vacante.delete()
            
            return Response({'message':'La vacante a sido eliminada, no se a guardado mensaje porque no hay solicitudes para esa vacante', 'status':status.HTTP_200_OK, 'exito':True})

class VacantesEmpresaView(APIView):

    permission_classes = [ IsAuthenticated ]

    # Requests vacancies of a company
    def get(self, request, *args, **kwargs):

        pk_empresa = self.kwargs['id_empresa']

        vacantes = m.Vacante.objects.filter(empresa=pk_empresa).order_by('-fecha', '-hora')
        serializer = s.Vacante_Serializer(vacantes, many=True)

        return Response({'data':serializer.data, 'status':status.HTTP_200_OK, 'exito':True})

class FiltrarVacantes(ListAPIView):

    permission_classes = [ IsAuthenticated ]
    filter_backends = [ DjangoFilterBackend ]
    serializer_class = s.Vacante_Serializer
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

    # Requests vacancies of a company
    def get(self, request, *args, **kwargs):

        pk_empresa = self.kwargs['id_empresa']

        empresa = m.Empresa.objects.filter(id=pk_empresa)
        serializer = self.serializer_class(empresa, many=True)

        return Response({'data':serializer.data, 'status':status.HTTP_200_OK, 'exito':True})

#Candidato
class CandidatoView(APIView):

    permission_classes = [ IsAuthenticated ]
    serializer_class = s.Candidato_Serializer

    def get_object(self, pk):
        # Returns an object instance that should 
        # be used for detail views.
        try:
            return m.Candidato.objects.get(pk=pk)
        except m.Candidato.DoesNotExist:
            raise Http404

    # Request all data of a candidato
    def get(self, request, *args, **kwargs):

        pk_candidato = self.kwargs['id_candidato']

        candidato = m.Candidato.objects.filter(id=pk_candidato)
        serializer_candidato = s.Candidato_Serializer(candidato, many=True)
        
        proyecto = m.Proyecto.objects.filter(candidato=pk_candidato)
        serializer_proyecto = s.Proyecto_Serializer(proyecto, many=True)

        experiencia = m.ExperienciaLaboralCandidato.objects.filter(candidato=pk_candidato)
        serializer_experiencia = s.Experiencia_Laboral_Serializer(experiencia, many=True)

        tecnologias = m.TecnologiasCandidato.objects.filter(candidato=pk_candidato)
        serializer_tecnologias = s.Tecnologias_Candidato_Serializer(tecnologias, many=True)

        return Response({'data':{'candidato':serializer_candidato.data, 'proyectos':serializer_proyecto.data, 'experiencia_laboral':serializer_experiencia.data, 'tecnologias':serializer_tecnologias.data}, 'status':status.HTTP_200_OK, 'exito':True})

    def put(self, request, id_candidato):
        pk = self.get_object(id_candidato)
        serializer = self.serializer_class(pk, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({'data':serializer.data, 'status':status.HTTP_200_OK, 'exito':True})
        return Response({'data':None, 'status':status.HTTP_400_BAD_REQUEST, 'exito':False, 'error message':serializer.errors})

#Solicitudes
class SolicitudesView(APIView):

    permission_classes = [ IsAuthenticated ]
    serializer_class = s.Solicitude_Serializer

    def get_object(self, pk):
        # Returns an object instance that should 
        # be used for detail views.
        try:
            return m.Solicitude.objects.get(pk=pk)
        except m.Solicitude.DoesNotExist:
            raise Http404

    # Requests of a vacancy
    def get(self, request, *args, **kwargs):

        pk_vacante = self.kwargs['id_vacante']

        solicitudes = m.Solicitude.objects.filter(vacante=pk_vacante).order_by('-fecha')
        serializer = self.serializer_class(solicitudes, many=True)

        return Response({'data':serializer.data, 'status':status.HTTP_200_OK, 'exito':True})

    # Solicitudes for a vacancy
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response({'data':serializer.data, 'status':status.HTTP_200_OK, 'exito': True})
        return Response({'data':None, 'status':status.HTTP_400_BAD_REQUEST, 'exito':False, 'error message':serializer.errors})

    def put(self, request, id_solicitud):
        pk = self.get_object(id_solicitud)
        serializer = self.serializer_class(pk, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({'data':serializer.data, 'status':status.HTTP_200_OK, 'exito':True})
        return Response({'data':None, 'status':status.HTTP_400_BAD_REQUEST, 'exito':False, 'error message':serializer.errors})

class SolicitudesCandidatoView(APIView):

    permission_classes = [ IsAuthenticated ]
    serializer_class = s.Candidato_Serializer

    # Requests solicitudes of a candidato in a vacancy
    def get(self, request, *args, **kwargs):

        pk_candidato = self.kwargs['id_candidato']

        solicitudes = m.Solicitude.objects.filter(candidato=pk_candidato).order_by('-fecha')
        serializer = s.Solicitude_Serializer(solicitudes, many=True)

        return Response({'data':serializer.data, 'status':status.HTTP_200_OK, 'exito':True})

#Vacantes Guardadas
class VacantesGuardadasView(ApiView):

    permission_classes = [ IsAuthenticated ]
    serializer_class = s.Vacantes_Guardadas_Serializer

    def get(self, request, *args, **kwargs):

        id_usuario = self.kwargs['id_candidato']

        user = m.VacantesGuardada.objects.filter(usuario=id_usuario)
        serializer = self.serializer_class(user, many=True)

        return Response({'data':serializer.data, 'status':status.HTTP_200_OK, 'exito':True})

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response({'data':serializer.data, 'status':status.HTTP_200_OK, 'exito':True})
        return Response({'data':None, 'status':status.HTTP_400_BAD_REQUEST, 'exito':False, 'error message':serializer.errors})

    def delete(self, request, *args, **kwargs):
        id_usuario = self.kwargs['id_usuario']
        id_vacante = self.kwargs['id_vacante']

        vacante = m.VacantesGuardada.objects.filter(usuario=id_usuario, vacante=id_vacante)
        
        if vacante:
            vacante.delete()

            return Response({'message':'La vacante a sido eliminada', 'status':status.HTTP_200_OK, 'exito':True})
        return Response({'message':'La vacante especificada no a sido guardada por dicho usuario', 'status':status.HTTP_400_BAD_REQUEST, 'exito':False})

#Categoria
class CategoriasView(APIView):

    permission_classes = [ IsAuthenticated ]
    serializer_class = s.Categoria_Serializer

    def get(self, request, *args, **kwargs):

        categorias = m.Categoria.objects.all()

        serializer = self.serializer_class(categorias, many=True)

        return Response({'data':serializer.data, 'status':status.HTTP_200_OK, 'exito':True})

#Proyecto
class ProyectoView(APIView):

    permission_classes = [ IsAuthenticated ]
    serializer_class = s.Proyecto_Serializer

    def get_object(self, pk):
        # Returns an object instance that should 
        # be used for detail views.
        try:
            return m.Proyecto.objects.get(pk=pk)
        except m.Proyecto.DoesNotExist:
            raise Http404

    def post(self, request, *args, **kwargs):

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response({'data':serializer.data, 'status':status.HTTP_200_OK, 'exito':True})
        return {'data':None, 'status':status.HTTP_400_BAD_REQUEST, 'exito':False, 'error message':serializer.errors}

    def put(self, request, id_proyecto):
        pk = self.get_object(id_proyecto)
        serializer = self.serializer_class(pk, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({'data':serializer.data, 'status':status.HTTP_200_OK, 'exito':True})
        return Response({'data':None, 'status':status.HTTP_400_BAD_REQUEST, 'exito':False, 'error message':serializer.errors})

    def delete(self, request, *args, **kwargs):
        pk = self.kwargs['id_proyecto']

        proyecto = m.Proyecto.objects.filter(id=pk)
        
        if proyecto:
            proyecto.delete()

            return Response({'message':'El proyecto a sido eliminada', 'status':status.HTTP_200_OK, 'exito':True})
        return Response({'message':'El proyecto no se a podido eliminar', 'status':status.HTTP_400_BAD_REQUEST, 'exito':False})

#Experiencia
class ExperienciaView(APIView):

    permission_classes = [ IsAuthenticated ]
    serializer_class = s.Experiencia_Laboral_Serializer

    def get_object(self, pk):
        # Returns an object instance that should 
        # be used for detail views.
        try:
            return m.ExperienciaLaboralCandidato.objects.get(pk=pk)
        except m.ExperienciaLaboralCandidato.DoesNotExist:
            raise Http404

    def post(self, request, *args, **kwargs):

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response({'data':serializer.data, 'status':status.HTTP_200_OK, 'exito':True})
        return {'data':None, 'status':status.HTTP_400_BAD_REQUEST, 'exito':False, 'error message':serializer.errors}

    def put(self, request, id_experiencia):
        pk = self.get_object(id_experiencia)
        serializer = self.serializer_class(pk, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({'data':serializer.data, 'status':status.HTTP_200_OK, 'exito':True})
        return Response({'data':None, 'status':status.HTTP_400_BAD_REQUEST, 'exito':False, 'error message':serializer.errors})

    def delete(self, request, *args, **kwargs):
        pk = self.kwargs['id_experiencia']

        experiencia = m.ExperienciaLaboralCandidato.objects.filter(id=pk)
        
        if experiencia:
            experiencia.delete()

            return Response({'message':'la experiencia a sido eliminada', 'status':status.HTTP_200_OK, 'exito':True})
        return Response({'message':'La experiencia no se a podido eliminar', 'status':status.HTTP_400_BAD_REQUEST, 'exito':False})

#Tecnologias
class TecnologiasCandidatoView(APIView):

    permission_classes = [ IsAuthenticated ]
    serializer_class = s.Tecnologias_Candidato_Serializer

    def get_object(self, pk):
        # Returns an object instance that should 
        # be used for detail views.
        try:
            return m.TecnologiasCandidato.objects.get(pk=pk)
        except m.TecnologiasCandidato.DoesNotExist:
            raise Http404

    def post(self, request, *args, **kwargs):

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response({'data':serializer.data, 'status':status.HTTP_200_OK, 'exito':True})
        return {'data':None, 'status':status.HTTP_400_BAD_REQUEST, 'exito':False, 'error message':serializer.errors}

    def put(self, request, id_tecnologia):
        pk = self.get_object(id_tecnologia)
        serializer = self.serializer_class(pk, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({'data':serializer.data, 'status':status.HTTP_200_OK, 'exito':True})
        return Response({'data':None, 'status':status.HTTP_400_BAD_REQUEST, 'exito':False, 'error message':serializer.errors})

    def delete(self, request, *args, **kwargs):
        pk = self.kwargs['id_tecnologia']

        tecnologia = m.TecnologiasCandidato.objects.filter(id=pk)
        
        if tecnologia:
            tecnologia.delete()

            return Response({'message':'La tecnologia a sido eliminada', 'status':status.HTTP_200_OK, 'exito':True})
        return Response({'message':'La tecnologia no se a podido eliminar', 'status':status.HTTP_400_BAD_REQUEST, 'exito':False})

#Mensajes Destino
class MensajesView(APIView):

    permission_classes = [ IsAuthenticated ]
    serializer_class = s.Mensaje_Serializer

    def get_object(self, pk):
        # Returns an object instance that should 
        # be used for detail views.
        try:
            return m.Mensaje.objects.get(pk=pk)
        except m.Mensaje.DoesNotExist:
            raise Http404

    def put(self, request, id_mensaje):
        mensaje = self.get_object(id_mensaje)
        serializer = self.serializer_class(mensaje, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({'data':serializer.data, 'status':status.HTTP_200_OK, 'exito':True})
        return Response({'data':None, 'status':status.HTTP_400_BAD_REQUEST, 'exito':False, 'error message':serializer.errors})
    
#Mensajes Destino
class MensajesDestinosView(APIView):

    permission_classes = [ IsAuthenticated ]
    serializer_class = s.Mensajes_Destino_Serializer

    def get(self, request, *args, **kwargs):

        id_usuario = self.kwargs['id_usuario']

        mensajes = m.MensajesUsuariosDestino.objects.filter(usuario_destino=id_usuario)
        serializer = self.serializer_class(mensajes, many=True)

        return Response({'data':serializer.data, 'status':status.HTTP_200_OK, 'exito':True})

#Prueba tecnica
class PruebaTecnicaView(APIView):
    
    permission_classes = [ IsAuthenticated ]
    serializer_class = s.Prueba_Tecnica_Serializer

    def get_object(self, pk):
        # Returns an object instance that should 
        # be used for detail views.
        try:
            return m.PruebaTecnica.objects.get(pk=pk)
        except m.PruebaTecnica.DoesNotExist:
            raise Http404

    def get(self, request, *args, **kwargs):

        id_empresa = self.kwargs['pk']

        pruebas = m.PruebaTecnica.objects.filter(empresa=id_empresa)
        serializer = self.serializer_class(pruebas, many=True)

        return Response({'data':serializer.data, 'status':status.HTTP_200_OK, 'exito':True})

    def post(self, request, *args, **kwargs):

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response({'data':serializer.data, 'status':status.HTTP_200_OK, 'exito':True})
        return {'data':None, 'status':status.HTTP_400_BAD_REQUEST, 'exito':False, 'error message':serializer.errors}

    def put(self, request, pk):
        prueba = self.get_object(pk)
        serializer = self.serializer_class(prueba, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({'data':serializer.data, 'status':status.HTTP_200_OK, 'exito':True})
        return Response({'data':None, 'status':status.HTTP_400_BAD_REQUEST, 'exito':False, 'error message':serializer.errors})

#Prueba tecnica asignada
class PruebaTecnicaAsignadaView(APIView):
    
    permission_classes = [ IsAuthenticated ]
    serializer_class = s.Prueba_Tecnica_Asignada_Serializer

    def get_object(self, pk):
        # Returns an object instance that should 
        # be used for detail views.
        try:
            return m.PruebaTecnicaAsignada.objects.get(pk=pk)
        except m.PruebaTecnicaAsignada.DoesNotExist:
            raise Http404

    def get(self, request, *args, **kwargs):

        id_candidato = self.kwargs['pk']

        pruebas = m.PruebaTecnicaAsignada.objects.filter(candidato=id_candidato)
        serializer = self.serializer_class(pruebas, many=True)

        return Response({'data':serializer.data, 'status':status.HTTP_200_OK, 'exito':True})

    def post(self, request, *args, **kwargs):

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response({'data':serializer.data, 'status':status.HTTP_200_OK, 'exito':True})
        return {'data':None, 'status':status.HTTP_400_BAD_REQUEST, 'exito':False, 'error message':serializer.errors}

    def put(self, request, pk):
        prueba_asignada = self.get_object(pk)
        serializer = self.serializer_class(prueba_asignada, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({'data':serializer.data, 'status':status.HTTP_200_OK, 'exito':True})
        return Response({'data':None, 'status':status.HTTP_400_BAD_REQUEST, 'exito':False, 'error message':serializer.errors})

class PruebasAsignadasVacante(APIView):
    
    permission_classes = [ IsAuthenticated ]
    pass