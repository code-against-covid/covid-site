# Generated by Django 3.1.5 on 2021-05-05 15:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('announcement', '0003_alter_announcement_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='announcement',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]