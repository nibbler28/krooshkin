from django.views.generic.base import TemplateView
from django.views.generic.list import ListView
from .models import Photo

class HomePageView(ListView):
    template_name = "krooshkin/pages/index.html"
    model = Photo

class AboutPageView(TemplateView):
    template_name = "krooshkin/pages/about.html"

class ContactsPageView(TemplateView):
    template_name = "krooshkin/pages/contacts.html"
