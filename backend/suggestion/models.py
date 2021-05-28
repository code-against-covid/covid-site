from django.db import models
import datetime


class Suggestion(models.Model):
    name = models.CharField(max_length=100, default='Anonymous', null=True)
    description = models.CharField(max_length=1000, default=None)
    ip_address = models.CharField(max_length=100, default=None)
    created_at = models.CharField(max_length=20, default=None)

    def __str__(self):
        return "{}".format(self.id)
