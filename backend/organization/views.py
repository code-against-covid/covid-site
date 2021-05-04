from django.shortcuts import render
from rest_framework import viewsets
from .models import Organization
from .serializers import OrganizationSerializer


# pylint:disable = E1101


class OrganizationView(viewsets.ModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer
