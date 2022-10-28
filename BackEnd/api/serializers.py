from rest_framework import serializers

from vacantes.models import Categoria, Empresa, Vacante, Candidato, Solicitude, VacantesGuardadas

#Categorias
class Categoria_Serializer(serializers.ModelSerializer):
    
    nombre = serializers.StringRelatedField()

    class Meta:
        model = Categoria
        fields = '__all__'

#Empresas
class Empresa_Serializer(serializers.ModelSerializer):

    usuario = serializers.StringRelatedField()

    class Meta:
        model = Empresa
        fields = '__all__'

#Vacantes
class Vacante_Serializer(serializers.ModelSerializer):

    class Meta:
        model = Vacante
        fields = '__all__'

class Obtener_Vacantes_Serializer(serializers.ModelSerializer):

    categoria = serializers.StringRelatedField()
    empresa = Empresa_Serializer()

    class Meta:
        model = Vacante
        fields = [
            "id",
            "nombre_puesto",
            "categoria",
            "empresa",
            "tipo_trabajo",
            "forma_trabajo",
            "experiencia",
            "responsabilidades_puesto",
            "requisitos_obligatorios",
            "requisitos_opcionales",
            "salario_min",
            "salario_max",
            "beneficios",
            "horario_trabajo",
            "fecha",
            "hora"
        ]

#Candidatos
class Candidato_Serializer(serializers.ModelSerializer):
    
    usuario = serializers.StringRelatedField()

    class Meta:
        model = Candidato
        fields = '__all__'

class Obtener_Candidato_Serializer(serializers.ModelSerializer):

    usuario = serializers.StringRelatedField()

    class Meta:
        model = Candidato
        fields = '__all__'

#Solicitudes
class Solicitude_Serializer(serializers.ModelSerializer):

    class Meta:
        model = Solicitude
        fields = '__all__'

class Solicitude_Vacante_Serializer(serializers.ModelSerializer):

    vacante = serializers.StringRelatedField()
    candidato = Candidato_Serializer()

    class Meta:
        model = Solicitude
        fields = '__all__'

#Vacantes Guardadas
class Vacantes_Guardadas_Serializer(serializers.ModelSerializer):

    class Meta:
        model = VacantesGuardadas
        fields = '__all__'

class Obtener_Vacantes_Guardadas_Serializer(serializers.ModelSerializer):

    vacante = serializers.StringRelatedField()
    usuario = serializers.StringRelatedField()
    fecha_guardado = serializers.StringRelatedField()

    class Meta:
        model = VacantesGuardadas
        fields = '__all__'