from django.db import models


class Blossom(models.Model):
    name = models.CharField(max_length=500)
    link = models.CharField(max_length=500, default=None)

    def __str__(self):
        return "{}".format(self.name)
