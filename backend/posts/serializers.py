from rest_framework import serializers

from .models import Post


# POST SERIALIZER
class PostSerializer(serializers.ModelSerializer):

    user = serializers.StringRelatedField(read_only=True)

    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()

    class Meta:

        model = Post

        fields = [

            "id",
            "user",
            "title",
            "content",
            "image",
            "is_active",
            "created_at",
            "updated_at",
            "likes_count",
            "comments_count",
        ]

        read_only_fields = [

            "user",
            "created_at",
            "updated_at",
        ]


    #  TITLE VALIDATION 
    def validate_title(self, value):

        if len(value) < 3:

            raise serializers.ValidationError(
                "Title too short"
            )

        return value


    #  CONTENT VALIDATION
    def validate_content(self, value):

        if len(value) < 10:

            raise serializers.ValidationError(
                "Content too short"
            )

        return value


    #  LIKES COUNT 
    def get_likes_count(self, obj):

        if hasattr(obj, "likes"):

            return obj.likes.count()

        return 0


    #  COMMENTS COUNT
    def get_comments_count(self, obj):

        if hasattr(obj, "comments"):

            return obj.comments.count()

        return 0