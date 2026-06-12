from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .models import Follow
from notifications.models import Notification

User = get_user_model()


class ToggleFollowView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, user_id):

        if request.user.id == user_id:
            return Response({"error": "Cannot follow yourself"})

        try:
            user = User.objects.get(id=user_id)

        except User.DoesNotExist:
            return Response({"error": "User not found"})

        follow = Follow.objects.filter(
            follower=request.user,
            following=user
        ).first()

        if follow:

            follow.delete()

            return Response({
                "following": False,
                "followers_count": user.followers_set.count()
            })

        Follow.objects.create(
            follower=request.user,
            following=user
        )

        if user != request.user:

            Notification.objects.get_or_create(
                user=user,
                sender=request.user,
                type="follow"
            )

        return Response({
            "following": True,
            "followers_count": user.followers_set.count()
        })
    



User = get_user_model()
class FollowStatusView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):

        is_following = Follow.objects.filter(
            follower=request.user,
            following_id=user_id
        ).exists()

        return Response({
            "is_following": is_following
        })