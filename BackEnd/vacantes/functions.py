import uuid

def image_upload_location(instance, filename):

    return f'imagenes/{uuid.uuid1()}.jpg'

def file_upload_location(instance, filename):

    return f'cv/{uuid.uuid1()}.pdf'