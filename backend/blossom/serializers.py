from rest_framework import serializers
from .models import Blossom


class BlossomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blossom
        fields = ('id', 'name', 'link')
