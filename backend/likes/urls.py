from django.urls import path

from .views import ToggleLikeView


urlpatterns = [

    # like / unlike
    path(
        "<int:post_id>/",
        ToggleLikeView.as_view(),
        name="toggle-like"
    ),
]