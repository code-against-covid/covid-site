from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Suggestion
from .serializers import SuggestionSerializer


# pylint:disable = E1101


class SuggestionView(viewsets.ModelViewSet):
    queryset = Suggestion.objects.all().order_by('-created_at')
    serializer_class = SuggestionSerializer
    permission_classes = (permissions.AllowAny,)
