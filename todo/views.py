from rest_framework.viewsets import  ViewSet
from todo.models import Worker, Project, ToDo
from todo.serializer import UserModelSerializer, ProjectModelSerializer, ToDoModelSerializer, UserSerializer, UserSerializer2
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, UpdateAPIView, RetrieveAPIView, CreateAPIView, DestroyAPIView
from rest_framework.pagination import LimitOffsetPagination
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework import filters
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, DjangoModelPermissionsOrAnonReadOnly
from rest_framework.views import APIView
from django.contrib.auth.models import User

class CurrentUserView(ViewSet, ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'id'

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return UserSerializer2
        return UserSerializer       

class UserModelViewSet(ViewSet, ListAPIView, CreateAPIView, UpdateAPIView, RetrieveAPIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = Worker.objects.all()
    serializer_class = UserModelSerializer
    lookup_field = 'id'
    filterset_fields = ('id', 'first_name', 'last_name')


class ProjectPagination(LimitOffsetPagination):
    authentication_classes = [SessionAuthentication]
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    default_limit = 10


class ProjectModelViewSet(ViewSet, ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    lookup_field = 'id'
    pagination_class = ProjectPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ('name',)


class ToDoPagination(LimitOffsetPagination):
    #authentication_classes = [SessionAuthentication]
    #permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    default_limit = 20


class ToDoModelViewSet(ViewSet, CreateAPIView, ListAPIView, RetrieveAPIView, UpdateAPIView):
    #authentication_classes = [SessionAuthentication]
    #permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    lookup_field = 'id'
    pagination_class = ToDoPagination
    filterset_fields = ('project',)

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
