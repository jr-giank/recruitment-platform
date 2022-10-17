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
from .views import ApiView, VacantesView, EmpresaView, ObtenerVacanteView, SolicitudesView, CandidatoView, SolicitudesVacanteView, VacantesEmpresaView, RegisterView, MyTokenObtainPairView, VacantesGuardadasView, ObtenerVacantesGuardadasView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', ApiView.as_view(), name='api_urls'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='signup'),
    path('vacantes/', VacantesView.as_view(), name='crear-vacante'),
    path('crear/empresa/', EmpresaView.as_view(), name='crear-empresa'),
    path('crear/solicitud/', SolicitudesView.as_view(), name='crear-solicitud'),
    path('crear/candidato/', CandidatoView.as_view(), name='crear-candidato'),
    path('vacantes/guardadas/', VacantesGuardadasView.as_view(), name='guardar-vacante'),
    path('obtener/vacante/<int:pk>/',ObtenerVacanteView.as_view(), name='obtener-vacante'),
    path('obtener/vacantes/candidato/<int:pk>/', ObtenerVacantesGuardadasView.as_view(), name='vacantes-guardadas-candidato'),
    path('solicitudes/vacante/<int:pk>/', SolicitudesVacanteView.as_view(), name='solicitudes-vacante'),
    path('vacantes/empresa/<int:pk>/', VacantesEmpresaView.as_view(), name='vacantes-empresa'),
    path('eliminar/vacante/guardada/<int:pk>/', VacantesGuardadasView.as_view(), name='eliminar-vacante'),
]
