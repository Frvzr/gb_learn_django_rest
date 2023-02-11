from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from todo.models import Worker, Project, ToDo
from django.contrib.auth.models import User

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'date_joined']

class UserSerializer2(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'date_joined', 'is_superuser', 'is_staff']


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = Worker
        #fields = '__all__'
        fields = ['id', 'first_name', 'last_name']
        

class ProjectModelSerializer(ModelSerializer):
    #worker = UserModelSerializer(many=True)
    class Meta:
        model = Project
        #fields = '__all__'
        fields = ['id', 'name', 'link', 'worker']
        #depth = 1


class ToDoModelSerializer(ModelSerializer):
    #project = ProjectModelSerializer()
    #writer = UserModelSerializer()
    class Meta:
        model = ToDo
        #fields = '__all__'
        fields = ['id', 'project', 'text', 'created', 'updated', 'writer', 'completed']
        #depth = 1