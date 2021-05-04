from django.db import models


class Organization(models.Model):
    name = models.CharField(max_length=500)
    email = models.CharField(max_length=500)
    address = models.CharField(max_length=1000)
    phone = models.CharField(max_length=50)
    logo = models.CharField(max_length=50)

    def __str__(self):
        return "{}".format(self.name)
