from django.db import models


class Announcement(models.Model):
    name = models.CharField(max_length=500)
    description = models.CharField(max_length=500, default=None)
    link = models.CharField(max_length=500, default=None)

    def __str__(self):
        return "{}".format(self.name)
