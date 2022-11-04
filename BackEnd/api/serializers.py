from rest_framework import serializers

from vacantes import models as m

#Categorias
class Categoria_Serializer(serializers.ModelSerializer):
    
    nombre = serializers.StringRelatedField()

    class Meta:
        model = m.Categoria
        fields = '__all__'

#Empresas
class Empresa_Serializer(serializers.ModelSerializer):

    class Meta:
        model = m.Empresa
        fields = '__all__'

    def to_representation(self, obj):

        self.fields['usuario'] = serializers.StringRelatedField()

        return super(Empresa_Serializer, self).to_representation(obj)

#Vacantes
class Vacante_Serializer(serializers.ModelSerializer):

    class Meta:
        model = m.Vacante
        fields = '__all__'

    def to_representation(self, obj):

        # self.fields['categoria'] = Categoria_Serializer()
        self.fields['status'] = serializers.CharField(source='get_status_display')
        self.fields['categoria'] = serializers.StringRelatedField()
        self.fields['empresa'] = Empresa_Serializer()

        return super(Vacante_Serializer, self).to_representation(obj)
        
#Candidatos
class Candidato_Serializer(serializers.ModelSerializer):
    
    class Meta:
        model = m.Candidato
        fields = '__all__'

    def to_representation(self, obj):

        self.fields['usuario'] = serializers.StringRelatedField()

        return super(Candidato_Serializer, self).to_representation(obj)

#Solicitudes
class Solicitude_Serializer(serializers.ModelSerializer):

    class Meta:
        model = m.Solicitude
        fields = '__all__'

    def to_representation(self, obj):

        self.fields['vacante'] = serializers.StringRelatedField()
        self.fields['candidato'] = Candidato_Serializer()      

        return super(Solicitude_Serializer, self).to_representation(obj)

#Vacantes Guardadas
class Vacantes_Guardadas_Serializer(serializers.ModelSerializer):

    class Meta:
        model = m.VacantesGuardada
        fields = '__all__'

    def to_representation(self, obj):

        self.fields['vacante'] = Vacante_Serializer()
        self.fields['usuario'] = serializers.StringRelatedField()      

        return super(Vacantes_Guardadas_Serializer, self).to_representation(obj)

#Proyectos Candidato
class Proyecto_Serializer(serializers.ModelSerializer):

    class Meta:
        model = m.Proyecto
        fields = '__all__'

    def to_representation(self, obj):

        self.fields['candidato'] = Candidato_Serializer()      

        return super(Proyecto_Serializer, self).to_representation(obj)

#Experiencia Candidato
class Experiencia_Laboral_Serializer(serializers.ModelSerializer):

    class Meta:
        model = m.ExperienciaLaboralCandidato
        fields = '__all__'

    def to_representation(self, obj):

        self.fields['candidato'] = Candidato_Serializer()      

        return super(Proyecto_Serializer, self).to_representation(obj)

#Tecnologias Candidato
class Tecnologias_Candidato_Serializer(serializers.ModelSerializer):

    class Meta:
        model = m.TecnologiasCandidato
        fields = '__all__'

    def to_representation(self, obj):

        self.fields['candidato'] = Candidato_Serializer()      

        return super(Proyecto_Serializer, self).to_representation(obj)