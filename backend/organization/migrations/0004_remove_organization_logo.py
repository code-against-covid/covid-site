# Generated by Django 3.1.5 on 2021-05-05 09:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('organization', '0003_auto_20210505_0206'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='organization',
            name='logo',
        ),
    ]
