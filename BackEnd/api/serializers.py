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

    class Meta:
        model = Empresa
        fields = '__all__'

    def to_representation(self, obj):

        self.fields['usuario'] = serializers.StringRelatedField()

        return super(Empresa_Serializer, self).to_representation(obj)

#Vacantes
class Vacante_Serializer(serializers.ModelSerializer):

    class Meta:
        model = Vacante
        fields = '__all__'

    def to_representation(self, obj):

        self.fields['categoria'] = serializers.StringRelatedField()
        self.fields['empresa'] = Empresa_Serializer()

        return super(Vacante_Serializer, self).to_representation(obj)
        
#Candidatos
class Candidato_Serializer(serializers.ModelSerializer):
    
    class Meta:
        model = Candidato
        fields = '__all__'

    def to_representation(self, obj):

        self.fields['usuario'] = serializers.StringRelatedField()

        return super(Candidato_Serializer, self).to_representation(obj)

#Solicitudes
class Solicitude_Serializer(serializers.ModelSerializer):

    class Meta:
        model = Solicitude
        fields = '__all__'

    def to_representation(self, obj):

        self.fields['vacante'] = serializers.StringRelatedField()
        self.fields['candidato'] = Candidato_Serializer()      

        return super(Solicitude_Serializer, self).to_representation(obj)

#Vacantes Guardadas
class Vacantes_Guardadas_Serializer(serializers.ModelSerializer):

    class Meta:
        model = VacantesGuardadas
        fields = '__all__'

    def to_representation(self, obj):

        self.fields['vacante'] = Vacante_Serializer()
        self.fields['usuario'] = serializers.StringRelatedField()      

        return super(Vacantes_Guardadas_Serializer, self).to_representation(obj)