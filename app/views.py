from rest_framework.viewsets import ModelViewSet, ViewSet
from .models import Author, Book, Biography, Article
from .serialaizers import AuthorModelSerializer, BiographyModelSerializer, BookModelSerializer, ArticleModelSerializer
from rest_framework.generics import CreateAPIView, ListAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import AllowAny

class AuthorPaginator(LimitOffsetPagination):
    default_limit = 3

class AuthorModelViewSet(ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorModelSerializer
    filterset_fields = ['first_name', 'last_name', 'birthday_year'] 
    pagination_class = AuthorPaginator

class BiographyModelViewSet(ModelViewSet):
    queryset = Biography.objects.all()
    serializer_class = BiographyModelSerializer


class BookModelViewSet(ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Book.objects.all()
    serializer_class = BookModelSerializer


class ArticleModelViewSet(ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleModelSerializer

class MyAPIView(CreateAPIView, ListAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorModelSerializer


class MyAPIView(ViewSet):
    def list(self, request):
        authors = Author.objects.all()
        serializer = AuthorModelSerializer(authors, many = True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def first(self, request):
        return Response({'data': 'fffff'})