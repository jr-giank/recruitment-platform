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
    path('register/', v.RegisterView.as_view(), name='signup'),
    path('register/empresa', v.RegisterEmpresaView.as_view(), name='signup-empresa'),
    path('vacantes/', v.VacantesView.as_view(), name='crear-vacante'),
    path('vacante/guardar/', v.VacantesGuardadasView.as_view(), name='guardar-vacante'),
    path('vacantes/empresa/<int:pk>/', v.VacantesEmpresaView.as_view(), name='vacantes-empresa'),
    path('vacante/eliminar/guardada/<int:id_candidato>/<int:id_vacante>/', v.VacantesGuardadasView.as_view(), name='eliminar-vacante'),
    path('crear/solicitud/', v.SolicitudesView.as_view(), name='crear-solicitud'),
    path('crear/candidato/', v.CandidatoView.as_view(), name='crear-candidato'),
    path('obtener/vacante/<int:pk>/', v.ObtenerVacanteView.as_view(), name='obtener-vacante'),
    path('obtener/vacantes/candidato/<int:pk>/', v.ObtenerVacantesGuardadasView.as_view(), name='vacantes-guardadas-candidato'),
    path('solicitudes/vacante/<int:pk>/', v.SolicitudesVacanteView.as_view(), name='solicitudes-vacante'),
]
