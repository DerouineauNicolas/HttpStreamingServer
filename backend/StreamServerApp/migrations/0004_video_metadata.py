# Generated by Django 2.1.2 on 2018-12-23 15:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('StreamServerApp', '0003_auto_20181223_1500'),
    ]

    operations = [
        migrations.AddField(
            model_name='video',
            name='metadata',
            field=models.CharField(default='', max_length=100),
        ),
    ]
