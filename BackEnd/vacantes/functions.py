import uuid

from rest_framework_simplejwt.tokens import RefreshToken

def image_upload_location(instance, filename):

    return f'imagenes/{uuid.uuid1()}.jpg'

def file_upload_location(instance, filename):

    return f'cv/{uuid.uuid1()}.pdf'

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    
    # Add custom claims
    refresh['username'] = user.username
    refresh['first_name'] = user.first_name
    refresh['last_name'] = user.last_name
    refresh['is_staff'] = user.is_staff

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
