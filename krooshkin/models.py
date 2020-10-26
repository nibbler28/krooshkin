from django.db import models
from PIL import Image
from pathlib import Path
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile


class Photo(models.Model):
    title = models.CharField(max_length=200)
    photo = models.ImageField(upload_to='uploaded/images/')
    placeholder_image = models.ImageField(upload_to="uploaded/images/placeholders/", null=True, blank=True, editable=False)
    vertical = models.BooleanField(default=False)

    def __str__(self):
        return self.title

#     def create_placeholder_image(self):
#             '''
#             https://www.shellvoide.com/python/compressing-images-and-managing-thumbnails-in-django-admin/
#             https://stackoverflow.com/a/52936682/9675926
#             https://docs.djangoproject.com/en/3.1/ref/models/fields/#django.db.models.fields.files.FieldFile.save
#             https://docs.djangoproject.com/en/3.0/_modules/django/core/files/uploadedfile/
#             https://docs.djangoproject.com/en/3.1/ref/files/file/#django.core.files.File.file
#             '''
#             image = Image.open(self.photo.file.file)
#             image_file = BytesIO()
#             image.save(image_file, 'JPEG', quality=10)
#             placeholder_image_name = Path(self.photo.name).stem + '.JPEG'
#             self.placeholder_image.save(
#                 placeholder_image_name,
#                 InMemoryUploadedFile(
#                     image_file,
#                     None, '',
#                     image.content_type,
#                     image.size,
#                     image.charset
#                 ),
#                 save=False
#             )

        def create_placeholder_image(self):
            '''
            https://www.shellvoide.com/python/compressing-images-and-managing-thumbnails-in-django-admin/
            https://stackoverflow.com/a/52936682/9675926
            https://docs.djangoproject.com/en/3.1/ref/models/fields/#django.db.models.fields.files.FieldFile.save
            https://docs.djangoproject.com/en/3.0/_modules/django/core/files/uploadedfile/
            https://docs.djangoproject.com/en/3.1/ref/files/file/#django.core.files.File.file
            '''
            image = Image.open(self.photo.file.file)
            image_file = BytesIO()
            image.save(image_file, 'JPEG', quality=10)
            placeholder_image_name = Path(self.photo.name).stem
            self.placeholder_image = InMemoryUploadedFile(image_file,
                'ImageField', placeholder_image_name, 'image/jpeg', image.size, None)

            def save(self):
                self.create_placeholder_image()
                super().save(*args, **kwargs)
#     def create_thumbnail(self):
#             image = Image.open(self.image.file.file)
#             image.thumbnail(size=(310, 230))
#             image_file = BytesIO()
#             image.save(image_file, image.format)
#             self.thumbnail_image.save(
#                 self.image.name,
#                 InMemoryUploadedFile(
#                     image_file,
#                     None, '',
#                     self.image.file.content_type,
#                     image.size,
#                     self.image.file.charset,
#                 ),
#                 save=False
#             )
