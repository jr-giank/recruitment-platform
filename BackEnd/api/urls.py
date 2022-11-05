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
    path('vacantes/empresa/<int:id_empresa>/', v.EmpresaView.as_view(), name='obtener-vacantes-empresa'),
    path('vacantes/filtrar/', v.FiltrarVacantes.as_view(), name='filtrar-vacantes'),
    path('vacante/<int:id_vacante>/', v.VacanteView.as_view(), name='obtener-vacante'),
    path('vacante/guardar/', v.VacantesGuardadasView.as_view(), name='guardar-vacante'),
    path('vacante/guardada/<int:id_candidato>/', v.VacantesGuardadasView.as_view(), name='obtener-vacantes-guardadas'),
    path('vacante/guardada/eliminar/<int:id_usuario>/<int:id_vacante>/', v.VacantesGuardadasView.as_view(), name='eliminar-vacante-guardada'),
    path('solicitud/', v.SolicitudesView.as_view(), name='crear-solicitud'),
    path('solicitudes/vacante/<int:id_vacante>/', v.SolicitudesView.as_view(), name='obtener-solicitudes-vacante'),
    path('solicitudes/candidato/<int:id_candidato>/', v.SolicitudesCandidatoView.as_view(), name='obtener-solicitudes-candidato'),
    path('candidato/<int:id_candidato>/', v.CandidatoView.as_view(), name='obtener-candidato'),
    path('categorias/', v.CategoriasView.as_view(), name='obtener-categorias'),
]
