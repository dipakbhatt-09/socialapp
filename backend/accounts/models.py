from django.db import models
from django.contrib.auth.models import AbstractUser

# CUSTOM USER MODEL
class User(AbstractUser):

    email = models.EmailField(unique=True)

    def __str__(self):
        return self.username


# PROFILE MODEL
class Profile(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="profile"
    )

    bio = models.TextField(
        max_length=500,
        blank=True,
        null=True
    )

    # PROFILE IMAGE
    image = models.ImageField(
        upload_to="profiles/",
        default="default.jpg"
    )


    # COVER IMAGE
    cover_image = models.ImageField(
        upload_to="covers/",
        default="default_cover.jpg",
        blank=True,
        null=True
    )


    # EDUCATION
    education = models.CharField(
        max_length=200,
        blank=True,
        null=True
    )


    # LOCATION
    location = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )


    # WEBSITE
    website = models.URLField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        null=True,
        blank=True
    )

    updated_at = models.DateTimeField(
        auto_now=True,
        null=True,
        blank=True
    )

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user.username} Profile"