# Generated by Django 3.2 on 2021-05-18 09:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('team', '0002_team_email'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='team',
            name='email',
        ),
    ]