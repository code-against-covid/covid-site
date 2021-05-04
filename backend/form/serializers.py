from rest_framework import serializers
from form.models import Form
from state.models import State
from resource.models import Resource
from status.models import Status


class FormSerializer(serializers.ModelSerializer):

    class Meta:
        model = Form
        fields = ['id', 'name', 'state', 'resource',
                  'status', 'ip_address', 'additional_info', 'created_at']
