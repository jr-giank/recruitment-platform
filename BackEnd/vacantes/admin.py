from django.contrib import admin
from .models import Candidato, Categoria, Empresa, Solicitude, Vacante

class ShowIdAdmin(admin.ModelAdmin):
    readonly_fields = ['id'] 

# Register your models here.
admin.site.register(Categoria, ShowIdAdmin)
admin.site.register(Empresa, ShowIdAdmin)
admin.site.register(Vacante, ShowIdAdmin)
admin.site.register(Candidato, ShowIdAdmin)
admin.site.register(Solicitude, ShowIdAdmin)
