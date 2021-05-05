from rest_framework import serializers
from form.models import Form
from status.models import Status


class FormSerializer(serializers.ModelSerializer):

    class Meta:
        model = Form
        fields = '__all__'
