from rest_framework.serializers import ModelSerializer
from todo.models import User, Project, ToDo


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class ProjectModelSerializer(ModelSerializer):
    worker = UserModelSerializer(many=True)
    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(ModelSerializer):
    writer = UserModelSerializer()

    class Meta:
        model = ToDo
        fields = '__all__'