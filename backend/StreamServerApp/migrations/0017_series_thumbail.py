# Generated by Django 2.2.8 on 2020-01-28 12:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('StreamServerApp', '0016_auto_20191231_1744'),
    ]

    operations = [
        migrations.AddField(
            model_name='series',
            name='thumbail',
            field=models.CharField(default='', max_length=300),
        ),
    ]
