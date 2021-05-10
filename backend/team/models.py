from django.db import models


class Team(models.Model):
    name = models.CharField(max_length=500, default=None)
    job = models.CharField(max_length=500, default=None)
    university = models.CharField(max_length=1000, default=None)
    qualification = models.CharField(max_length=50, default=None)
    # logo = models.CharField(max_length=50, default=None)

    def __str__(self):
        return "{}".format(self.name)
