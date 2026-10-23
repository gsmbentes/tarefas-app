from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from .models import Tarefa
from .serializers import TarefaSerializer


@api_view(['GET', 'POST'])
def listar_tarefas(request):
    if request.method == 'GET':
        tarefas = Tarefa.objects.filter(na_lixeira=False)
        serializer = TarefaSerializer(tarefas, many=True)
        return Response(serializer.data)

    serializer = TarefaSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

@api_view(['GET', 'PATCH', 'DELETE'])
def detalhes_tarefa(request, pk):
    tarefa = get_object_or_404(Tarefa, pk=pk)

    if request.method == 'GET':
        serializer = TarefaSerializer(tarefa)
        return Response(serializer.data)

    if request.method == 'PATCH':
        serializer = TarefaSerializer(
            tarefa,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    tarefa.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def listar_lixeira(request):
    tarefas = Tarefa.objects.filter(na_lixeira=True)
    serializer = TarefaSerializer(tarefas, many=True)
    return Response(serializer.data)