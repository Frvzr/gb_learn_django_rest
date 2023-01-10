from django.db import models

class User(models.Model):
    first_name = models.CharField(max_length=64, verbose_name="First name")
    last_name = models.CharField(max_length=64, verbose_name="Last name")


class Project(models.Model):
    name = models.CharField(max_length=32, verbose_name="Project name")
    link = models.URLField(blank=True, verbose_name="Link")
    worker = models.ManyToManyField(User)


class ToDo(models.Model):
    project = models.ManyToManyField(Project)
    text = models.TextField()
    created = models.DateField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    writer = models.ForeignKey(User, on_delete=models.CASCADE)
    active = models.TextChoices("Active", "Closed")
