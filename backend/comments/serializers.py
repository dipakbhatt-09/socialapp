from rest_framework import serializers
from .models import Comment


#  COMMENT SERIALIZER 

class CommentSerializer(serializers.ModelSerializer):

    user = serializers.StringRelatedField(read_only=True)

    # nested replies 
    replies = serializers.SerializerMethodField()

    class Meta:

        model = Comment

        fields = [

            "id",
            "user",
            "post",
            "text",
            "parent",
            "created_at",
            "updated_at",
            "replies",
        ]

        read_only_fields = [

            "user",
            "created_at",
            "updated_at",
        ]

    #  RECURSIVE REPLIES 

    def get_replies(self, obj):

        children = obj.replies.all()

        return CommentSerializer(children, many=True).data

    # VALIDATION

    def validate_text(self, value):

        if len(value.strip()) == 0:

            raise serializers.ValidationError(
                "Comment cannot be empty"
            )

        return value