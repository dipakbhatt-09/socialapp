from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from .models import Profile, User
from rest_framework.permissions import (
    IsAuthenticated,
    AllowAny
)

from rest_framework import status

from .serializers import (
    RegisterSerializer,
    ProfileSerializer,
    ChangePasswordSerializer
)

from .models import Profile



# REGISTER VIEW
class RegisterView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        serializer = RegisterSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                {
                    "message": "Account created successfully"
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )



# PROFILE VIEW
class ProfileView(APIView):

    permission_classes = [IsAuthenticated]

    # GET PROFILE 

    def get(self, request):

        # AUTO CREATE PROFILE IF MISSING
        profile, created = Profile.objects.get_or_create(
            user=request.user
        )

        serializer = ProfileSerializer(profile)

        return Response(serializer.data)
    

    # UPDATE PROFILE 
    def patch(self, request):

        # AUTO CREATE PROFILE IF MISSING
        profile, created = Profile.objects.get_or_create(
            user=request.user
        )

        serializer = ProfileSerializer(
            profile,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


# CHANGE PASSWORD VIEW
class ChangePasswordView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = ChangePasswordSerializer(
            data=request.data
        )

        if serializer.is_valid():

            user = request.user

            # old password check
            if not user.check_password(
                serializer.data["old_password"]
            ):

                return Response(
                    {
                        "error": "Old password incorrect"
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            # set new password
            user.set_password(
                serializer.data["new_password"]
            )

            user.save()

            return Response(
                {
                    "message": "Password changed successfully"
                }
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    

   
# PUBLIC USER PROFILE VIEW
class UserProfileView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):

        try:
            profile = Profile.objects.get(
                user__id=user_id
            )

            serializer = ProfileSerializer(profile)

            return Response(serializer.data)

        except Profile.DoesNotExist:

            return Response(
                {
                    "error": "Profile not found"
                },
                status=404
            )