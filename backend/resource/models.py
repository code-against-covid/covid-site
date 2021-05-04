from django.db import models


class Resource(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return "{}".format(self.name)
