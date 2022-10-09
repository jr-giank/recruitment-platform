from django.contrib import admin
from .models import Candidato, Categoria, Empresa, Solicitude, Vacante

# Register your models here.
admin.site.register(Categoria)
admin.site.register(Empresa)
admin.site.register(Vacante)
admin.site.register(Candidato)
admin.site.register(Solicitude)
