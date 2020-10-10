from django.contrib import admin
from .models import Photo

admin.site.site_header = 'Krooshkin administration'
admin.site.site_title = 'Krooshkin site admin'
admin.site.register(Photo)
