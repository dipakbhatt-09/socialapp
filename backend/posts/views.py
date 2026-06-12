from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Post
from .serializers import PostSerializer


#post list and create post 
class PostListCreateView(generics.ListCreateAPIView):

    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Post.objects.filter(
            is_active=True
        ).select_related("user")

    def perform_create(self, serializer):

        serializer.save(user=self.request.user)



#post detail  
class PostDetailView(generics.RetrieveUpdateDestroyAPIView):

    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    lookup_field = "pk"

    def get_queryset(self):

        return Post.objects.filter(
            is_active=True
        ).select_related("user")

    def perform_update(self, serializer):

        if self.request.user != serializer.instance.user:
            raise PermissionError("Not allowed")

        serializer.save()

    def perform_destroy(self, instance):

        if self.request.user != instance.user:
            raise PermissionError("Not allowed")

        instance.is_active = False
        instance.save()