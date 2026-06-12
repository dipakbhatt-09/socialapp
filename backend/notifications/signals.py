from django.db.models.signals import post_save
from django.dispatch import receiver

from likes.models import Like
from comments.models import Comment
from follows.models import Follow
from .models import Notification


@receiver(post_save, sender=Like)
def like_notification(sender, instance, created, **kwargs):

    if created and instance.user != instance.post.user:

        Notification.objects.create(
            user=instance.post.user,
            sender=instance.user,
            post=instance.post,
            type="like"
        )


@receiver(post_save, sender=Comment)
def comment_notification(sender, instance, created, **kwargs):

    if created and instance.user != instance.post.user:

        Notification.objects.create(
            user=instance.post.user,
            sender=instance.user,
            post=instance.post,
            type="comment"
        )


@receiver(post_save, sender=Follow)
def follow_notification(sender, instance, created, **kwargs):

    if created and instance.follower != instance.following:

        Notification.objects.create(
            user=instance.following,
            sender=instance.follower,
            type="follow"
        )