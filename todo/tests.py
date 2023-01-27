from django.test import TestCase
import json
from rest_framework import status

from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from django.contrib.auth.models import User
from .views import UserModelViewSet
from .models import Worker

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
        response = client.get(f'api/workers/{worker.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_quest(self):
        worker = Worker.objects.create(first_name ='Александр', last_name = 'Первый')
        client = APIClient()
        response = client.put(f'api/workers/{worker.id}/', {'first_name': 'Алекс', 'last_name': 'Первый'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)