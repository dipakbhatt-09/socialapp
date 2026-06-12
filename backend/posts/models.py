from django.db import models
from django.conf import settings
import re


# Post model
class Post(models.Model):

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="posts"
    )

    title = models.CharField(max_length=255)
    content = models.TextField()

    # Optional post image
    image = models.ImageField(
        upload_to="posts/",
        blank=True,
        null=True
    )

    is_active = models.BooleanField(default=True)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user.username} - {self.title}"

    # Extract hashtags from content
    def extract_hashtags(self):
        return re.findall(r"#(\w+)", self.content)

    # Save post and link hashtags
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        hashtags = self.extract_hashtags()

        for tag in hashtags:
            tag_obj, created = Hashtag.objects.get_or_create(
                name=tag.lower()
            )

            tag_obj.posts.add(self)


# Hashtag model
class Hashtag(models.Model):

    name = models.CharField(
        max_length=50,
        unique=True
    )

    # Related posts
    posts = models.ManyToManyField(
        Post,
        related_name="hashtags",
        blank=True
    )

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return f"#{self.name}"