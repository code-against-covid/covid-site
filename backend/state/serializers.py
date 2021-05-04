from rest_framework import serializers
from .models import State


class StateSerializer(serializers.ModelSerializer):
    form_state = serializers.StringRelatedField(many=True)

    class Meta:
        model = State
        fields = ('id', 'name', 'form_state')
