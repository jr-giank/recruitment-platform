def file_upload_location(instance, filename):

    return f'curriculums{instance.id}-{instance.nombre}-{filename}'