from django.shortcuts import render
from rest_framework import viewsets
from .models import Status
from .serializers import StatusSerializer


# pylint:disable = E1101


class StatusView(viewsets.ModelViewSet):
    queryset = Status.objects.all()
    serializer_class = StatusSerializer
