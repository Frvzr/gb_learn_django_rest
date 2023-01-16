from rest_framework.viewsets import  ViewSet
from todo.models import User, Project, ToDo
from todo.serializer import UserModelSerializer, ProjectModelSerializer, ToDoModelSerializer
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, UpdateAPIView, RetrieveAPIView, CreateAPIView, DestroyAPIView
from rest_framework.pagination import LimitOffsetPagination
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework import filters


class UserModelViewSet(ViewSet, ListAPIView, UpdateAPIView, RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    lookup_field = 'id'
    filterset_fields = ('id', 'first_name', 'last_name')


class ProjectPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectModelViewSet(ViewSet, ListAPIView, RetrieveAPIView, CreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    lookup_field = 'id'
    pagination_class = ProjectPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ('name',)


class ToDoPagination(LimitOffsetPagination):
    default_limit = 20


class ToDoModelViewSet(ViewSet, CreateAPIView, ListAPIView, RetrieveAPIView, UpdateAPIView):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    lookup_field = 'id'
    pagination_class = ToDoPagination
    filterset_fields = ('project',)

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
