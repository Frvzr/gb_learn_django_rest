from django.test import TestCase
import json
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from django.contrib.auth.models import User
from .views import UserModelViewSet, ProjectModelViewSet, ToDoModelViewSet
from .models import Worker, Project, ToDo
from mixer.backend.django import mixer

class TestWorkerViewSet(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/workers')
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_quest(self):
        factory = APIRequestFactory()
        request = factory.post('/api/workers', {'first_name': 'Александр', 'last_name': 'Первый'})
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_creae_admin(self):
        factory = APIRequestFactory()
        request = factory.post('/api/workers', {'first_name': 'Александр', 'last_name': 'Первый'})
        admin = User.objects.create_superuser('admin1', 'admin@admin@com', 'admin')
        force_authenticate(request, admin)
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        worker = Worker.objects.create(first_name ='Александр', last_name = 'Первый')
        client = APIClient()
        response = client.get(f'/api/workers/{worker.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_quest(self):
        worker = Worker.objects.create(first_name ='Александр', last_name = 'Первый')
        client = APIClient()
        response = client.put(f'/api/workers/{worker.id}/', {'first_name': 'Алекс', 'last_name': 'Первый'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_edit_admin(self):
        worker = Worker.objects.create(first_name ='Александр', last_name = 'Первый')
        client = APIClient()
        admin = User.objects.create_superuser('admin', 'admin@admin@com', 'admin')
        client.login(username='admin', password = 'admin')
        response = client.put(f'/api/workers/{worker.id}/', {'first_name': 'Алекс', 'last_name': 'Первый'})
        worker = Worker.objects.get(pk=worker.id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(worker.first_name, 'Алекс')
        client.logout()


class TestProjectViewSet(APITestCase):
    
    def test_get_lists(self):
        admin = User.objects.create_superuser('admin', 'admin@admin@com', 'admin')
        self.client.login(username='admin', password = 'admin')
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_book_admin(self):
        admin = User.objects.create_superuser('admin', 'admin@admin@com', 'admin')
        self.client.login(username='admin', password = 'admin')
        worker = Worker.objects.create(first_name ='Александр', last_name = 'Первый')
        project = Project.objects.create(name ='Проект', link = 'https://ex.com')
        response = self.client.put(f'/api/projects/{project.id}/', {'name': 'First', 'link': 'https://ex.com', 'worker': worker.pk})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=project.id)
        self.assertEqual(project.name, 'First')
        self.client.logout()


class TestToDoViewSet(APITestCase):

    def test_get_list(self):
        response = self.client.get('/api/todo/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_lists(self):
        factory = APIRequestFactory()
        request = factory.get('/api/todo/')
        view = ToDoModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_admin_mixer(self):
        todo = mixer.blend(ToDo)
        admin = User.objects.create_superuser('admin', 'admin@admin@com', 'admin')
        self.client.login(username='admin', password = 'admin')
        response = self.client.put(f'/api/todo/{todo.id}/', {
            'project': todo.project.id, 
            'text': 'text',
            'writer': todo.writer.id,
            'completed': "True"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = ToDo.objects.get(id=todo.id)
        self.assertEqual(todo.text, 'text')
