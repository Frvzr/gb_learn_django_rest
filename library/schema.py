import graphene
from graphene_django import DjangoObjectType
from todo.models import Worker, Project, ToDo


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class WorkerType(DjangoObjectType):
    class Meta:
        model = Worker
        fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectType)
    all_workers = graphene.List(WorkerType)
    all_todoes = graphene.List(ToDoType)
    projects_by_worker = graphene.List(ProjectType, name=graphene.String(required=False))

    def resolve_all_projects(self, info):
        return Project.objects.all()
    
    def resolve_all_workers(self, info):
        return Worker.objects.all()

    def resolve_all_todoes(self, info):
        return ToDo.objects.all()
    
    def resolve_projects_by_worker(self, info, name=None):
        projects = Project.objects.all()
        if name:
            projects = projects.filter(worker__last_name=name)
        return projects


class ToDoMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        text = graphene.String()
        completed = graphene.Boolean()
    
    todo = graphene.Field(ToDoType)

    @classmethod
    def mutate(cls, root, info, id, text, completed):
        todo = ToDo.objects.get(pk=id)
        todo.text = text
        todo.completed = completed
        todo.save()
        return ToDoMutation(todo=todo)


class Mutation(graphene.ObjectType):
    update_todo = ToDoMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)