# Generated by Django 3.2 on 2021-05-10 09:58

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default=None, max_length=500)),
                ('job', models.CharField(default=None, max_length=500)),
                ('university', models.CharField(default=None, max_length=1000)),
                ('qualification', models.CharField(default=None, max_length=50)),
            ],
        ),
    ]
