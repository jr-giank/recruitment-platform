import uuid

from rest_framework_simplejwt.tokens import RefreshToken

def image_upload_location(instance, filename):

    return f'imagenes/{uuid.uuid1()}.jpg'

def file_upload_location(instance, filename):

    return f'cv/{uuid.uuid1()}.pdf'

def get_tokens_for_user(user, candidato = None, empresa = None):
    refresh = RefreshToken.for_user(user)
    
    # Add custom claims
    if candidato != None:
        refresh['candidato_id'] = candidato.id
        refresh['first_name'] = candidato.nombre
        refresh['last_name'] = candidato.apellido
        refresh['email'] = user.email
        refresh['is_staff'] = user.is_staff
        refresh["foto"] = candidato.foto.url
    elif empresa != None:
        refresh['empresa_id'] = empresa.id
        refresh["nombre_empresa"] = empresa.nombre
        refresh["correo"] = user.email
        refresh["correo_vacantes"] = empresa.correo_vacantes
        refresh['is_staff'] = user.is_staff
        refresh["foto"] = empresa.foto.url

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
