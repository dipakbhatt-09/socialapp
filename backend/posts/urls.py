from django.urls import path

from .views import (
    PostListCreateView,
    PostDetailView
)

urlpatterns = [

    # GET POSTS + CREATE POST
    path(
        "",
        PostListCreateView.as_view(),
        name="post-feed"
    ),

    # SINGLE POST DETAIL
    path(
        "<int:pk>/",
        PostDetailView.as_view(),
        name="post-detail"
    ),
]