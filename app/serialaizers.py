from rest_framework.serializers import ModelSerializer
from .models import Author, Biography, Book, Article


class AuthorModelSerializer(ModelSerializer):
    class Meta:
        model = Author
        fields = ['id','first_name', 'last_name', 'birthday_year']


class BiographyModelSerializer(ModelSerializer):
    class Meta:
        model = Biography
        fields = '__all__'


class BookModelSerializer(ModelSerializer):
    author = AuthorModelSerializer(many=True)

    class Meta:
        model = Book
        fields = ['name', 'author']


class ArticleModelSerializer(ModelSerializer):
    author = AuthorModelSerializer(many=True)

    class Meta:
        model = Article
        fields = '__all__'