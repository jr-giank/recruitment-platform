# Generated by Django 4.1.2 on 2022-10-13 18:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vacantes', '0010_candidato_cv_solicitude_candidato_path_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='solicitude',
            name='candidato_path',
        ),
        migrations.AlterField(
            model_name='solicitude',
            name='cv_candidato',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='solicitude',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
