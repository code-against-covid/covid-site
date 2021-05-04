from django.shortcuts import render
from rest_framework import viewsets
from .models import Announcement
from .serializers import AnnouncementSerializer


# pylint:disable = E1101


class AnnouncementView(viewsets.ModelViewSet):
    queryset = Announcement.objects.all()
    serializer_class = AnnouncementSerializer
