from django.db import models


class Organization(models.Model):
    name = models.CharField(max_length=500, default=None)
    email = models.CharField(max_length=500, default=None)
    address = models.CharField(max_length=1000, default=None)
    phone = models.CharField(max_length=50, default=None)
    # logo = models.CharField(max_length=50, default=None)

    def __str__(self):
        return "{}".format(self.name)
