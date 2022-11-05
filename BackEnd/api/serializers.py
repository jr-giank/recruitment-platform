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
        fields = [
            "id",
            "nombre",
            "apellido",
            "usuario",
            "mensage_presentacion",
            "correo_contacto",
            "pais",
            "foto",
            "sexo",
            "nacimiento",
            "titulo_personal",
            "url_web",
            "url_facebook",
            "url_twitter",
            "url_instagram",
            "url_linkedin",
            "url_github",
            "url_telegram",
            "url_twitter",
            "cv_1",
            "cv_2"
        ]

    def to_representation(self, obj):

        self.fields['usuario'] = serializers.StringRelatedField()
        # self.fields['usuario'] = UserSerializer()

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

        return super(Experiencia_Laboral_Serializer, self).to_representation(obj)

#Tecnologias Candidato
class Tecnologias_Candidato_Serializer(serializers.ModelSerializer):

    class Meta:
        model = m.TecnologiasCandidato
        fields = '__all__'

    def to_representation(self, obj):

        self.fields['candidato'] = Candidato_Serializer()
        self.fields['nivel_conocimiento'] = serializers.CharField(source='get_nivel_conocimiento_display')  

        return super(Tecnologias_Candidato_Serializer, self).to_representation(obj)

#Mensaje
class Mensaje_Serializer(serializers.ModelSerializer):

    class Meta:
        model = m.Mensaje
        fields = '__all__'

    def to_representation(self, obj):

        self.fields['usuario'] = serializers.StringRelatedField()

        return super(Mensaje_Serializer, self).to_representation(obj)

#Mensajes Usuarios Destino
class Mensajes_Destino_Serializer(serializers.ModelSerializer):

    class Meta:
        model = m.MensajesUsuariosDestino
        fields = '__all__'

    def to_representation(self, obj):

        self.fields['mensaje'] = Mensaje_Serializer()
        self.fields['usuario_destino'] = serializers.StringRelatedField()

        return super(Mensajes_Destino_Serializer, self).to_representation(obj)
