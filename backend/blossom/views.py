from django.shortcuts import render
from rest_framework import viewsets
from .models import Blossom
from .serializers import BlossomSerializer


# pylint:disable = E1101


class BlossomView(viewsets.ModelViewSet):
    queryset = Blossom.objects.all()
    serializer_class = BlossomSerializer
