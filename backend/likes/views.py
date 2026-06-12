from django.db import transaction
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Like
from posts.models import Post
from notifications.models import Notification


class ToggleLikeView(APIView):

    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def post(self, request, post_id):

        try:
            post = Post.objects.select_for_update().get(id=post_id)
        except Post.DoesNotExist:
            return Response({"error": "Post not found"}, status=404)

        like = Like.objects.filter(user=request.user, post=post).first()

        if like:
            like.delete()
            return Response({
                "liked": False,
                "likes_count": post.likes.count()
            })

        Like.objects.create(user=request.user, post=post)

        if post.user != request.user:
            Notification.objects.create(
                user=post.user,
                sender=request.user,
                post=post,
                type="like"
            )

        return Response({
            "liked": True,
            "likes_count": post.likes.count()
        })