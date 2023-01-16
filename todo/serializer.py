from rest_framework.serializers import ModelSerializer
from todo.models import User, Project, ToDo


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = User
        #fields = '__all__'
        fields = ['id', 'first_name', 'last_name']


class ProjectModelSerializer(ModelSerializer):
    #worker = UserModelSerializer(many=True)
    class Meta:
        model = Project
        #fields = '__all__'
        fields = ['name', 'link', 'worker']


class ToDoModelSerializer(ModelSerializer):
    #writer = UserModelSerializer()
    class Meta:
        model = ToDo
        #fields = '__all__'
        fields = ['id', 'project', 'text', 'created', 'updated', 'writer', 'completed']