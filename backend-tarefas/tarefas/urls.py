from django.urls import path
from .views import listar_tarefas,detalhes_tarefa,listar_lixeira   

urlpatterns = [
    path('tarefas/', listar_tarefas, name='listar_tarefas'),
    path('tarefas/lixeira/', listar_lixeira, name='listar_lixeira'),
    path('tarefas/<int:pk>/', detalhes_tarefa, name='detalhes_tarefa'),
]