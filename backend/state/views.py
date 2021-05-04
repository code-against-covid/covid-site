from django.shortcuts import render
from rest_framework import viewsets
from .models import State
from .serializers import StateSerializer


# pylint:disable = E1101


class StateView(viewsets.ModelViewSet):
    queryset = State.objects.all()
    serializer_class = StateSerializer
