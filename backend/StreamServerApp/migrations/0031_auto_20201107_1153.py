# Generated by Django 2.2.8 on 2020-11-07 11:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('StreamServerApp', '0030_subtitle_uploadeddata'),
    ]

    operations = [
        migrations.RenameField(
            model_name='subtitle',
            old_name='uploadeddata',
            new_name='uploaded_data',
        ),
    ]
