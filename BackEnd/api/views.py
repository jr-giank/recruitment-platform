from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView

from .serializers import Candidato_Serializer, Vacante_Serializer, Obtener_Vacantes_Serializer, Empresa_Serializer, Solicitude_Serializer, Solicitude_Vacante_Serializer

from vacantes.models import Vacante, Solicitude

# Create your views here.
class ApiView(APIView):

    def get(self, request, *args, **kwargs):
            
        api_urls = {
            'token': 'api/token',
            'token-refresh': 'api/token/refresh',
            'crear-vacante': 'api/vacantes',
            'crear-empresa': 'api/crear/empresa',
            'obtener-vacantes': 'api/vacantes',
            'obtener-vacante': 'api/obtener/vacante/id',
            'crear-solicitud': 'api/crear/solicitud/',
            'solicitudes-vacante': 'api/solicitudes/vacante/id',
            'vacantes-empresa': 'api/vacantes/empresa/id',
        }

        return Response(api_urls)

class VacantesView(APIView):
    serializer_class = Vacante_Serializer
    
    def get(self, request, *args, **kwargs):
        vacantes = Vacante.objects.all()
        serializer = Obtener_Vacantes_Serializer(vacantes, many=True)

        return Response(serializer.data)
    
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

class EmpresaView(APIView):

    serializer_class = Empresa_Serializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

class ObtenerVacanteView(APIView):

    serializer_class = Vacante_Serializer

    def get(self, request, *args, **kwargs):
        pk = self.kwargs["pk"]

        vacante = Vacante.objects.filter(id=pk)
        serializer = Vacante_Serializer(vacante, many=True)

        return Response(serializer.data)

class SolicitudesView(APIView):

    serializer_class = Solicitude_Serializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

class CandidatoView(APIView):

    serializer_class = Candidato_Serializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

class SolicitudesVacanteView(ApiView):

    serializer_class = Solicitude_Vacante_Serializer

    def get(self, request, *args, **kwargs):

        pk_vacante = self.kwargs['pk']

        solicitudes = Solicitude.objects.filter(vacante=pk_vacante).order_by('-fecha')
        serializer = self.serializer_class(solicitudes, many=True)

        return Response(serializer.data)


class VacantesEmpresaView(ApiView):

    serializer_class = Obtener_Vacantes_Serializer

    def get(self, request, *args, **kwargs):

        pk_empresa = self.kwargs['pk']

        vacantes = Vacante.objects.filter(empresa=pk_empresa).order_by('-fecha', '-hora')
        serializer = self.serializer_class(vacantes, many=True)

        return Response(serializer.data)