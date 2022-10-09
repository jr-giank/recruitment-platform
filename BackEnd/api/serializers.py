from rest_framework import serializers

from vacantes.models import Categoria, Empresa, Vacante, Candidato, Solicitude

class Categoria_Serializer(serializers.ModelSerializer):

    class Meta:
        model = Categoria
        fields = '__all__'

class Empresa_Serializer(serializers.ModelSerializer):

    class Meta:
        model = Empresa
        fields = '__all__'

class Vacante_Serializer(serializers.ModelSerializer):

    class Meta:
        model = Vacante
        fields = '__all__'

class Candidato_Serializer(serializers.ModelSerializer):

    class Meta:
        model = Candidato
        fields = '__all__'

class Solicitude_Serializer(serializers.ModelSerializer):

    class Meta:
        model = Solicitude
        fields = '__all__'