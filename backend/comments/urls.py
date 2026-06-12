from django.urls import path

from .views import (
    CommentCreateView,
    PostCommentListView
)

urlpatterns = [

    path(
        "create/",
        CommentCreateView.as_view(),
        name="create-comment"
    ),

    path(
        "post/<int:post_id>/",
        PostCommentListView.as_view(),
        name="post-comments"
    ),
]