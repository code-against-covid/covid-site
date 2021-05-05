from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Form
from .serializers import FormSerializer


# pylint:disable = E1101


class FormView(viewsets.ModelViewSet):
    queryset = Form.objects.all()
    serializer_class = FormSerializer
    permission_classes = (permissions.AllowAny,)
