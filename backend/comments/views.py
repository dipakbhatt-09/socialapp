from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import ValidationError
from .models import Comment
from .serializers import CommentSerializer
from posts.models import Post
from notifications.models import Notification


class CommentCreateView(generics.CreateAPIView):

    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):

        post_id = self.request.data.get("post")

        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            raise ValidationError("Post not found")

        serializer.save(
            user=self.request.user,
            post=post
        )

        if post.user != self.request.user:
            Notification.objects.create(
                user=post.user,
                sender=self.request.user,
                post=post,
                type="comment"
            )


class PostCommentListView(generics.ListAPIView):

    serializer_class = CommentSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Comment.objects.filter(
            post_id=self.kwargs["post_id"],
            parent=None
        ).select_related("user")