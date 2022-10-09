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
from django.urls import path, include
from .views import api, crear_vacante, crear_empresa, obtener_vacantes, obtener_vacante, crear_solicitud
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', api, name='api_urls'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('crear/vacante/', crear_vacante, name='crear-vacante'),
    path('crear/empresa/', crear_empresa, name='crear-empresa'),
    path('obtener/vacantes/', obtener_vacantes, name='obtener-vacantes'),
    path('obtener/vacante/<int:id>', obtener_vacante, name='obtener-vacante'),
    path('crear/solicitud/', crear_solicitud, name='crear-solicitud'),
]
