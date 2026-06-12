from django.db import models
from django.conf import settings
from posts.models import Post


#  NOTIFICATION MODEL
class Notification(models.Model):

    NOTI_TYPES = (
        ("like", "Like"),
        ("comment", "Comment"),
        ("follow", "Follow"),
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="notifications"
    )

    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="sent_notifications"
    )

    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    type = models.CharField(
        max_length=20,
        choices=NOTI_TYPES
    )

    is_read = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:

        ordering = ["-created_at"]

    def __str__(self):

        return f"{self.type} from {self.sender}"