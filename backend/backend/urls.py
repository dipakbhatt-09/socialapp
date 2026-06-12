from django.contrib import admin

from django.urls import path, include

from django.conf import settings

from django.conf.urls.static import static


# MAIN URLS

urlpatterns = [

    # ADMIN PANEL
    path("admin/", admin.site.urls),

    # AUTH APIs
    path("api/auth/", include("accounts.urls")),

    # POSTS APIs
    path("api/posts/", include("posts.urls")),

    # COMMENTS APIs
    path("api/comments/", include("comments.urls")),

    # LIKES APIs
    path("api/likes/", include("likes.urls")),

    # FOLLOW APIs
    path("api/follows/", include("follows.urls")),

    # NOTIFICATIONS APIs
    path("api/notifications/", include("notifications.urls")),

    # SEARCH APIs
    path("api/search/", include("search.urls")),

    
]


#  MEDIA FILES 

if settings.DEBUG:

    urlpatterns += static(

        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )