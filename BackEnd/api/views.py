from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import Vacante_Serializer, Empresa_Serializer, Solicitude_Serializer

from vacantes.models import Vacante
# Create your views here.

@api_view(['GET'])
def api(request):

    api_urls = {
        'token': 'api/token',
        'token-refresh': 'api/token/refresh',
        'crear-vacante': 'api/crear/vacante',
        'crear-empresa': 'api/crear/empresa',
        'obtener-vacantes': 'api/obtener/vacantes',
        'obtener-vacante': 'api/obtener/vacante/',
        'crear-solicitud': 'api/crear/solicitud/',
    }

    return Response(api_urls)

@api_view(['POST'])
def crear_vacante(request):

    serializer = Vacante_Serializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['POST'])
def crear_empresa(request):

    serializer = Empresa_Serializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['GET'])
def obtener_vacantes(request):

    vacantes = Vacante.objects.all()
    serializer = Vacante_Serializer(vacantes, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def obtener_vacante(request, id):

    vacante = Vacante.objects.get(id=id)
    serializer = Vacante_Serializer(vacante, many=True)

    return Response(serializer.data)

@api_view(['POST'])
def crear_solicitud(request):

    serializer = Solicitude_Serializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)