from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.contrib.auth import get_user_model

from posts.models import Post
from posts.serializers import PostSerializer


User = get_user_model()



# SEARCH API (USERS + POSTS)
@api_view(['GET'])
def search(request):

    query = request.GET.get('q', '').strip()

   

    # EMPTY QUERY SAFETY CHECK
    if not query:

        return Response({
            "users": [],
            "posts": []
        })

 
    # SEARCH USERS
    users = User.objects.filter(
        username__icontains=query
    )[:10]   # LIMIT for performance

    user_data = [
        {
            "id": user.id,
            "username": user.username
        }
        for user in users
    ]

    
    # SEARCH POSTS 
    posts = Post.objects.filter(
        content__icontains=query,   # FIXED HERE
        is_active=True
    ).select_related("user")[:10]

    post_data = PostSerializer(posts, many=True).data


    # RESPONSE
    return Response({

        "query": query,
        "users": user_data,
        "posts": post_data
    })