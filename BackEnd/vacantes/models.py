from django.db import models

from .functions import file_upload_location

#Choices
tipo_trabajo_opciones = [
    ('TEMPORAL', 'Temporal'),
    ('INDEFINIDO', 'Indefinido')
]

forma_trabajo_opciones = [
    ('PRESENCIAL', 'Presencial'),
    ('HIBRIDO', 'Hibrido'),
    ('REMOTO', 'Remoto')
]

# Create your models here.
class Categoria(models.Model):
    
    nombre = models.CharField(max_length=60, blank=False, null=False)

    def __str__(self):
        return self.nombre

class Empresa(models.Model):

    nombre = models.CharField(max_length=50, blank=False, null=False)
    direccion = models.CharField(max_length=90, blank=False, null=False)
    pais = models.CharField(max_length=30, blank=False, null=False)
    correo = models.EmailField(max_length=60, blank=False, null=False)
    correo_vacantes = models.EmailField(max_length=60, blank=False, null=False)
    descripcion_empresa = models.CharField(max_length=100, blank=False, null=False)
    contrasena = models.CharField(max_length=25, blank=False, null=False)
    telefono = models.CharField(max_length=13, blank=False, null=False) 
    url_web = models.URLField(max_length=100, blank=True, null=True)
    url_facebook = models.URLField(max_length=100, blank=True, null=True)
    url_instagram = models.URLField(max_length=100, blank=True, null=True)
    url_twitter = models.URLField(max_length=100, blank=True, null=True)
    foto = models.ImageField(upload_to='imagenes/empresas', blank=True, null=True)

    def __str__(self):
        return self.nombre

class Vacante(models.Model):

    nombre_puesto = models.CharField(max_length=50, blank=False, null=False)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE)
    tipo_trabajo = models.CharField(max_length=10, choices=tipo_trabajo_opciones, default='TEMPORAL')
    forma_trabajo = models.CharField(max_length=10, choices=forma_trabajo_opciones, default='PRESENCIAL')
    experiencia = models.BooleanField(blank=False, null=False)
    responsabilidades_puesto = models.TextField(blank=True, null=True)
    requisitos_obligatorios = models.TextField(blank=False, null=False)
    requisitos_opcionales = models.TextField(blank=False, null=False)
    salario_min = models.IntegerField(blank=False, null=False)
    salario_max = models.IntegerField(blank=False, null=False)
    beneficios = models.TextField(blank=True, null=True)
    horario_trabajo = models.CharField(max_length=25, blank=True, null=True)
    fecha = models.DateField(auto_now_add=True)
    hora = models.TimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombre_puesto} - {self.empresa}"

class Candidato(models.Model):

    nombre = models.CharField(max_length=50, blank=False, null=False)
    correo = models.EmailField(max_length=60, blank=False, null=False)

    def __str__(self):
        return self.nombre

class Solicitude(models.Model):

    vacante = models.ForeignKey(Vacante, on_delete=models.CASCADE)
    candidato = models.ForeignKey(Candidato, on_delete=models.CASCADE)
    mensaje = models.TextField(blank=False, null=False)
    fecha = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.candidato} - {self.vacante}"

