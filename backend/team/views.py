from django.shortcuts import render
from rest_framework import viewsets
from .models import Team
from .serializers import TeamSerializer


# pylint:disable = E1101


class TeamView(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
