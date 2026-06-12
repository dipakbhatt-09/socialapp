
from django.urls import path
from .views import NotificationListView, UnreadCountView

urlpatterns = [
    path("", NotificationListView.as_view()),
    path("unread/", UnreadCountView.as_view()),
]