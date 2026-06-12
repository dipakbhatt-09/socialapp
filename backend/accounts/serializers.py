from rest_framework import serializers

from django.contrib.auth.password_validation import validate_password

from .models import User, Profile


# REGISTER SERIALIZER
class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True
    )

    class Meta:

        model = User

        fields = [

            "username",
            "email",
            "password"
        ]


    # validate username
    def validate_username(self, value):

        if User.objects.filter(username=value).exists():

            raise serializers.ValidationError(
                "Username already exists"
            )

        return value


    # validate email
    def validate_email(self, value):

        if User.objects.filter(email=value).exists():

            raise serializers.ValidationError(
                "Email already exists"
            )

        return value


    # create user
    def create(self, validated_data):

        validate_password(validated_data["password"])

        user = User.objects.create_user(

            username=validated_data["username"],

            email=validated_data["email"],

            password=validated_data["password"]
        )

        return user



# PROFILE SERIALIZER
class ProfileSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        source="user.username",
        read_only=True
    )

    email = serializers.EmailField(
        source="user.email",
        read_only=True
    )

    class Meta:

        model = Profile

        fields = [

            "id",
            "username",
            "email",
            "bio",
            "image",
            "cover_image",
            "education",
            "location",
            "website",
            "created_at",
            "updated_at"
        ]

    # bio validation
    def validate_bio(self, value):

        if value and len(value) > 500:

            raise serializers.ValidationError(
                "Bio too long"
            )

        return value

    # image validation
    def validate_image(self, value):

        if value:

            max_size = 2 * 1024 * 1024

            if value.size > max_size:

                raise serializers.ValidationError(
                    "Profile image must be under 2MB"
                )

        return value

    # cover image validation
    def validate_cover_image(self, value):

        if value:

            max_size = 3 * 1024 * 1024

            if value.size > max_size:

                raise serializers.ValidationError(
                    "Cover image must be under 3MB"
                )

        return value



# CHANGE PASSWORD SERIALIZER
class ChangePasswordSerializer(serializers.Serializer):

    old_password = serializers.CharField(
        required=True
    )

    new_password = serializers.CharField(
        required=True
    )

    def validate_new_password(self, value):

        validate_password(value)

        return value