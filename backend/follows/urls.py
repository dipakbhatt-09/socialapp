from django.urls import path
from .views import ToggleFollowView, FollowStatusView

urlpatterns = [

    # follow/unfollow
    path("<int:user_id>/", ToggleFollowView.as_view(), name="toggle-follow"),

    # follow status check
    path("status/<int:user_id>/", FollowStatusView.as_view(), name="follow-status"),
]