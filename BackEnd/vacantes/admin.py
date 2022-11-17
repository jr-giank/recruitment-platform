from django.contrib import admin
from . import models as m

class ShowIdAdmin(admin.ModelAdmin):
    readonly_fields = ['id'] 

# Register your models here.
admin.site.register(m.Categoria, ShowIdAdmin)
admin.site.register(m.Empresa, ShowIdAdmin)
admin.site.register(m.Vacante, ShowIdAdmin)
admin.site.register(m.Candidato, ShowIdAdmin)
admin.site.register(m.Solicitude, ShowIdAdmin)
admin.site.register(m.VacantesGuardada, ShowIdAdmin)
admin.site.register(m.Proyecto, ShowIdAdmin)
admin.site.register(m.ExperienciaLaboralCandidato, ShowIdAdmin)
admin.site.register(m.TecnologiasCandidato, ShowIdAdmin)
admin.site.register(m.Mensaje, ShowIdAdmin)
admin.site.register(m.MensajesUsuariosDestino, ShowIdAdmin)
admin.site.register(m.PruebaTecnica, ShowIdAdmin)
admin.site.register(m.PruebaTecnicaAsignada, ShowIdAdmin)