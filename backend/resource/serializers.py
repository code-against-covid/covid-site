from rest_framework import serializers
from .models import Resource


class ResourceSerializer(serializers.ModelSerializer):

    form_resource = serializers.StringRelatedField(many=True)

    class Meta:
        model = Resource
        fields = ('id', 'name', 'form_resource')
