from django.db import models

# Create your models here.
class Exercise(models.Model):
    name = models.CharField(max_length=100)
    primary_muscle = models.CharField(max_length=50)
    additional_muscles = models.JSONField()
    description = models.TextField()
    gif_url = models.URLField()

    def __str__(self):
        return self.name