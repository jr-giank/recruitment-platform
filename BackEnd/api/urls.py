"""vacantes URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from . import views as v 
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', v.ApiView.as_view(), name='api_urls'),
    path('token/', v.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', v.RegisterView.as_view(), name='registrar-candidato'),
    path('register/empresa/', v.RegisterEmpresaView.as_view(), name='registrar-empresa'),
    path('vacantes/', v.VacantesView.as_view(), name='crear-vacante'),
    path('vacantes/empresa/<int:id_empresa>/', v.VacantesEmpresaView.as_view(), name='obtener-vacantes-empresa'),
    path('vacantes/filtrar/', v.FiltrarVacantes.as_view(), name='filtrar-vacantes'),
    path('vacante/<int:id_vacante>/', v.VacanteView.as_view()),
    path('vacante/guardar/', v.VacantesGuardadasView.as_view(), name='guardar-vacante'),
    path('vacante/guardada/<int:id_candidato>/', v.VacantesGuardadasView.as_view(), name='obtener-vacantes-guardadas'),
    path('vacante/guardada/eliminar/<int:id_usuario>/<int:id_vacante>/', v.VacantesGuardadasView.as_view(), name='eliminar-vacante-guardada'),
    path('solicitud/', v.SolicitudesView.as_view(), name='crear-solicitud'),
    path('solicitud/<int:id_solicitud>/', v.ActualizarSolicitudesView.as_view(), name='actualizar-solicitud'),
    path('solicitudes/vacante/<int:id_vacante>/', v.SolicitudesView.as_view(), name='obtener-solicitudes-vacante'),
    path('solicitudes/candidato/<int:id_candidato>/', v.SolicitudesCandidatoView.as_view(), name='obtener-solicitudes-candidato'),
    path('candidato/<int:id_candidato>/', v.CandidatoView.as_view(), name='obtener-candidato'),
    path('proyecto/', v.ProyectoView.as_view(), name='registrar-proyecto'),
    path('proyecto/<int:id_proyecto>/', v.ProyectoView.as_view(), name='editar-proyecto'),
    path('experiencia/', v.ExperienciaView.as_view(), name='registrar-experiencia'),
    path('experiencia/<int:id_experiencia>/', v.ExperienciaView.as_view(), name='editar-experiencia'),
    path('tecnologia/', v.TecnologiasCandidatoView.as_view(), name='registrar-tecnologia'),
    path('tecnologia/<int:id_tecnologia>/', v.TecnologiasCandidatoView.as_view(), name='editar-tecnologia'),
    path('empresa/<int:id_empresa>/', v.EmpresaView.as_view(), name='obtener-empresa'),
    path('mensaje/<int:id_mensaje>/', v.MensajesView.as_view(), name='actualizar-mensaje'),
    path('mensajes/<int:id_usuario>/', v.MensajesDestinosView.as_view(), name='obtener-mensaje'),
    path('categorias/', v.CategoriasView.as_view(), name='obtener-categorias'),
    path('prueba/', v.UnicaPruebaTecnicaView.as_view(), name='crear-prueba'),
    path('prueba/<int:pk>/', v.PruebaTecnicaView.as_view()),
    path('prueba/unica/<int:id_prueba>/', v.UnicaPruebaTecnicaView.as_view(), name='obtener-unica-prueba'),
    path('prueba/asignada/', v.CrearPruebaTecnicaAsignadaView.as_view(), name='crear-asignacion-prueba'),
    path('prueba/asignada/<int:pk>/', v.PruebaTecnicaAsignadaView.as_view(), name='obtener-pruebas-asignadas'),
    path('prueba/vacante/<int:id_vacante>/', v.PruebasAsignadasVacante.as_view(), name='obtener-pruebas-vacante'),
    path('entrevista/', v.AgendaEntrevistaView.as_view(), name='crear-agenda-entrevista'),
    path('entrevista/<int:pk>/', v.AgendaEntrevistaView.as_view(), name='agenda-entrevista-actualizar-eliminar'),
    path('entrevista/vacante/<int:pk>/', v.AgendaEntrevistaVacante.as_view(), name='obtener-agenda-entrevista-vacante'),
    path('entrevista/empresa/<int:pk>/', v.AgendaEntrevistaEmpresa.as_view(), name='obtener-agenda-entrevista-empresa'),
    path('entrevista/candidato/<int:pk>/', v.AgendaEntrevistaCandidato.as_view(), name='obtener-agenda-entrevista-candidato'),
]
