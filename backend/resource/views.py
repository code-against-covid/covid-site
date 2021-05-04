from django.shortcuts import render
from rest_framework import viewsets
from .models import Resource
from .serializers import ResourceSerializer


# pylint:disable = E1101


class ResourceView(viewsets.ModelViewSet):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer
