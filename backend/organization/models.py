from django.db import models


class Organization(models.Model):
    name = models.CharField(max_length=500)

    def __str__(self):
        return "{}".format(self.name)
