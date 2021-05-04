from django.db import models


class Announcement(models.Model):
    name = models.CharField(max_length=500)

    def __str__(self):
        return "{}".format(self.name)
