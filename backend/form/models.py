from django.db import models
from resource.models import Resource
from status.models import Status
from state.models import State
import datetime


class Form(models.Model):
    name = models.CharField(max_length=100, default='Anonymous', null=True)
    ip_address = models.CharField(max_length=100, default=None)
    state = models.CharField(max_length=100, default=None)
    resource = models.CharField(max_length=100, default=None)
    status = models.ForeignKey(
        Status, on_delete=models.CASCADE, related_name='form_status', default='Not verified')
    additional_info = models.CharField(max_length=500, default=None)
    created_at = models.CharField(max_length=20, default=None)

    def __str__(self):
        return "{}".format(self.id)
